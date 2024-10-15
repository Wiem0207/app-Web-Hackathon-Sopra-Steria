//Sidebar pour  button paramètre
let paramButton = document.getElementById("paramButton");
console.log(paramButton);
let sidebar = document.getElementById("sidebar");
console.log(sidebar);
paramButton.addEventListener("click", function () {
  if (sidebar.style.display === "none" || sidebar.style.display === "") {
    sidebar.style.display = "block"; // Affiche le panneau
  } else {
    sidebar.style.display = "none"; // Masque le panneau
  }
});

window.addEventListener("DOMContentLoaded", () => {
  // Charger les événements depuis le serveur
  fetch("http://127.0.0.1:3000/events")
    .then((response) => response.json())
    .then((data) => {
      for (const day in data) {
        data[day].forEach((event) => {
          // Ajouter l'événement sans le bouton de suppression
          ajouterEvenementDansListe(day, event.evenement, event.heure, false);
        });
      }
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des événements :", error)
    );


  loadLocalEvents();


  const ajoutEvenementForm = document.getElementById("ajoutEvenementForm");
  ajoutEvenementForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const evenement = document.getElementById("evenementInput").value;
    const heure = document.getElementById("heureInput").value;
    const jour = document.getElementById("jourInput").value;

    // Envoyer l'événement au serveur
    fetch("http://127.0.0.1:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ evenement, heure, jour }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'ajout de l'événement");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message); // Afficher le message de succès dans la console
        // Ajouter l'événement à l'affichage avec un bouton de suppression
        ajouterEvenementDansListe(jour, evenement, heure, true);
        ajouterEvenementLocalStorage(jour, evenement, heure); // Sauvegarder dans localStorage
        ajoutEvenementForm.reset(); // Réinitialiser le formulaire
      })
      .catch((error) =>
        console.error("Erreur lors de l'ajout de l'événement :", error)
      );
  });
});



function ajouterEvenementDansListe(jour, evenement, heure, avecBouton) {
  const newEventDiv = document.createElement("div");
  newEventDiv.classList.add("evenement");
  newEventDiv.textContent = `Jour : ${jour}, Événement : ${evenement}, Heure : ${heure}`;

  if (avecBouton) {
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.addEventListener("click", () => {
      supprimerEvenement(jour, evenement, heure, newEventDiv);
    });

    newEventDiv.appendChild(deleteButton); 
  }

  const evenementList = document.getElementById("evenementList");
  evenementList.appendChild(newEventDiv);
}


function loadLocalEvents() {
  const savedEvents = JSON.parse(localStorage.getItem("events")) || {};

  for (const jour in savedEvents) {
    savedEvents[jour].forEach((event) => {
      ajouterEvenementDansListe(jour, event.evenement, event.heure, true);
    });
  }
}


function ajouterEvenementLocalStorage(jour, evenement, heure) {
  let savedEvents = JSON.parse(localStorage.getItem("events")) || {};

  if (!savedEvents[jour]) {
    savedEvents[jour] = [];
  }

  savedEvents[jour].push({ evenement, heure });
  localStorage.setItem("events", JSON.stringify(savedEvents));
}


function supprimerEvenement(jour, evenement, heure, eventElement) {
  let savedEvents = JSON.parse(localStorage.getItem("events")) || {};

  if (savedEvents[jour]) {
    
    savedEvents[jour] = savedEvents[jour].filter(
      (event) => !(event.evenement === evenement && event.heure === heure)
    );

   
    localStorage.setItem("events", JSON.stringify(savedEvents));

    
    eventElement.remove();
  }
}


const Evenement_propose = document.getElementById("formEvent");
const inputText = document.getElementById("inputEcriture");
const selectedDay = document.getElementById("jourSemaine");
const selectedTime = document.getElementById("heureDebut");

Evenement_propose.addEventListener("submit", (event) => {
  event.preventDefault();

  let evenement = inputText.value;
  let jour = selectedDay.value;
  let heure = selectedTime.value;

 
  ajouterEvenementDansListe(jour, evenement, heure, true);
  ajouterEvenementLocalStorage(jour, evenement, heure);

  
  inputText.value = "";
  selectedDay.value = "";
  selectedTime.value = "";

  console.log("Objet events mis à jour dans localStorage");
});

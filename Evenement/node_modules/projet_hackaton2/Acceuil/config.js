// Données d'événements par défaut
const defaultEvents = {
  lundi: [],
  mardi: [
    {
      evenement: "Collecte poubelle",
      heure: "18:00",
    },
  ],
  mercredi: [
    {
      evenement: "Collecte colis",
      heure: "18:00",
    },
  ],
  jeudi: [],
  vendredi: [],
  samedi: [
    {
      evenement: "Jogging Ensemble!",
      heure: "09:00",
    },
  ],
  dimanche: [
    {
      evenement: "Jeux de Société",
      heure: "14:00",
    },
  ],
};

if (!localStorage.getItem("events")) {
  localStorage.setItem("events", JSON.stringify(defaultEvents));
}

function chargerEvenementsDansTableau() {
  const savedEvents = JSON.parse(localStorage.getItem("events"));

  for (const jour in savedEvents) {
    const cell = document.getElementById(jour);
    if (cell) {
      console.log(`Événements pour ${jour}:`, savedEvents[jour]);

      cell.innerHTML = "";

      savedEvents[jour].forEach((event) => {
        const eventDiv = document.createElement("div");
        eventDiv.textContent = `${event.evenement} à ${event.heure}`;
        cell.appendChild(eventDiv);
      });
    } else {
      console.warn(`Aucune cellule trouvée pour ${jour}`);
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  chargerEvenementsDansTableau();
});

//Sidebar pour button paramètre
let paramButton = document.getElementById("paramButton");
let sidebar = document.getElementById("sidebar");
paramButton.addEventListener("click", function () {
  if (sidebar.style.display === "none" || sidebar.style.display === "") {
    sidebar.style.display = "block";
  } else {
    sidebar.style.display = "none";
  }
});

let nom_utilisateur = localStorage.getItem("nom_utilisateur");

// Afficher le nom dans la page
if (nom_utilisateur) {
  document.getElementById("afficher_nom").textContent = nom_utilisateur;
}

function showMessage(message, emojiElement) {
  const messageDiv = document.getElementById("emojiMessage");

  messageDiv.innerText = message;
  messageDiv.classList.add("show");

  const emojiItems = document.querySelectorAll(".emoji-item");
  emojiItems.forEach((item) => {
    item.classList.remove("shadow");
  });

  emojiElement.classList.add("shadow");
}

document.addEventListener("click", function (event) {
  const messageDiv = document.getElementById("emojiMessage");
  const isEmoji = event.target.classList.contains("emoji-item");
  if (!isEmoji) {
    messageDiv.classList.remove("show");
    const emojiItems = document.querySelectorAll(".emoji-item");
    emojiItems.forEach((item) => {
      item.classList.remove("shadow");
    });
  }
});

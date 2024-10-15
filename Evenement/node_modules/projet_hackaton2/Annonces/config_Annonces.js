//Sidebar pour  button paramètre
//*******************************************************************//
let paramButton = document.getElementById("paramButton");
let sidebar = document.getElementById("sidebar");
paramButton.addEventListener("click", function () {
  if (sidebar.style.display === "none" || sidebar.style.display === "") {
    sidebar.style.display = "block";
  } else {
    sidebar.style.display = "none";
  }
});
//*******************************************************************//

const cards = document.querySelectorAll(".card");
const textArea = document.getElementById("input-area");
const announcementInput = document.getElementById("announcement");
const submitButton = document.getElementById("submit-btn");
const evenementList = document.getElementById("evenementList");

function afficherAnnonces() {
  evenementList.innerHTML = "";
  const savedAnnouncements = JSON.parse(localStorage.getItem("annonces")) || [];
  savedAnnouncements.forEach((annonce) => {
    const newEventDiv = document.createElement("div");
    newEventDiv.classList.add("evenement");
    newEventDiv.textContent = `Annonce : ${annonce}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.addEventListener("click", () => {
      supprimerAnnonce(annonce, newEventDiv);
    });
    newEventDiv.appendChild(deleteButton);
    evenementList.appendChild(newEventDiv);
  });
}

afficherAnnonces();

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (textArea.style.display === "none" || textArea.style.display === "") {
      textArea.style.display = "block";
    } else {
      textArea.style.display = "none";
    }
  });
});

submitButton.addEventListener("click", () => {
  const announcement = announcementInput.value.trim();
  if (announcement) {
    const savedAnnouncements =
      JSON.parse(localStorage.getItem("annonces")) || [];
    savedAnnouncements.push(announcement);
    localStorage.setItem("annonces", JSON.stringify(savedAnnouncements));

    announcementInput.value = "";
    textArea.style.display = "none";

    afficherAnnonces();
  }
});

function supprimerAnnonce(annonce, eventElement) {
  let savedAnnouncements = JSON.parse(localStorage.getItem("annonces")) || [];

  savedAnnouncements = savedAnnouncements.filter((item) => item !== annonce);

  localStorage.setItem("annonces", JSON.stringify(savedAnnouncements));

  eventElement.remove();
}

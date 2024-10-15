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

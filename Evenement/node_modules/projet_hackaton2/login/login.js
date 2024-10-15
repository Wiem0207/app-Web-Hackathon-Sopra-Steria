let seConnecter = document.getElementById("button_se_connecter");

console.log(seConnecter);
seConnecter.addEventListener("click", (event) => {
  console.log(seConnecter);
  let nom_utilisateur = document.getElementById("nom_utilisateur").value;

  localStorage.setItem("nom_utilisateur", nom_utilisateur);
  window.location.href = "../Acceuil/Acceuil.html";
});

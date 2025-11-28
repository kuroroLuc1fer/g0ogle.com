// =====================================
//  Initialisation
// =====================================
// ANNULER CLIQUE (RÉUSSITE du challenge)
    const flag = "dark4rmy{BON_REFLEXE_HEIN}";
function updatetext() {
  const input_element = document.getElementById("email_input");
  
  // Remplacer l'input pour utiliser l'ID dans la fonction next()
  if (input_element) input_element.id = "email_input";

  
  // Vérifier si un mail est déjà sauvegardé pour ne pas forcer l'étape 1
  const savedMail = document.getElementById("save_mail").value.trim();
  if (savedMail && savedMail !== "g") {
      document.getElementById("step1").style.display = "none";
      document.getElementById("step2").style.display = "block";
      document.getElementById("email_display").innerText = savedMail;
  } else {
      document.getElementById("step1").style.display = "block";
      document.getElementById("step2").style.display = "none";
  }
}


// =====================================
//  Fonction pour afficher le message d'erreur
// =====================================
function displayError(message) {
    // Supprimer l'ancien espacement si présent
    document.getElementById("spacer").innerHTML = "<br>";
    
    // Appliquer les styles d'erreur à l'étape visible
    const input_box = document.getElementById("step1").style.display !== "none" ? 
                      document.getElementById('email_input') : 
                      document.getElementById('password_input');
    
    const input_text = document.getElementById("step1").style.display !== "none" ? 
                       document.getElementById('placeholder_email') : 
                       document.getElementById('placeholder_password');

    if (input_box && input_text) {
        input_box.style.cssText = "outline: none; border: 2px solid red;";
        input_text.style.cssText = "color: red;";
    }
    
    document.getElementById("error").innerHTML =
        `<span class="inline-block" style="color:red;">${message}</span>`;
}


// =====================================
//  ÉTAPE 1 : Vérification email / numéro & passage à l'étape 2
// =====================================
function next() {
  const mailid = document.getElementById("email_input").value.trim();
  
  // 1. Vérification de la valeur
  if (mailid === "") {
    displayError("Entrez un email ou numéro de téléphone");
    return;
  }
  
  // Effacer l'erreur de l'étape 1
  document.getElementById("error").innerHTML = "";

  // 2. Sauvegarder et afficher l'email
  document.getElementById("save_mail").value = mailid;
  const displayMail = mailid.length > 42 ? mailid.slice(0, 42) + "..." : mailid;
  document.getElementById("email_display").innerText = displayMail;

  // 3. Masquer l'étape 1 et afficher l'étape 2 (Mot de passe)
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
  document.getElementById("text_2").innerText = "Bienvenue"; // Changer le titre

}

// =====================================
//  ÉTAPE 2 : Logique du Challenge Phishing (sur soumission du mot de passe)
// =====================================
function next2() {
  const password = document.getElementById("password_input").value.trim();
  
  // 1. Vérification de la valeur du mot de passe
  if (password === "") {
    displayError("Entrez votre mot de passe");
    return;
  }
  
  // Effacer l'erreur de l'étape 2
  document.getElementById("error").innerHTML = "";
  
  // 2. Vérification du statut de l'échec dans localStorage
  const failedBefore = localStorage.getItem("phishing_fail");

  if (failedBefore === "true") {
      alert("⚠️ Échec enregistré: Vous vous êtes déjà fait avoir. Revenez au prochain challenge.");
      return;
  }

  // 3. Demander confirmation pour le challenge
  const proceed = confirm(
    "Confirmer l'envoi ?\n\n"
  );

  if (proceed) {
    // OK CLIQUE (ÉCHEC du challenge)
    localStorage.setItem("phishing_fail", "true");
    showFlag();
  } else {
    localStorage.setItem("phishing_fail", "false"); // Enregistre la réussite
    // Afficher le flag
    showFlag();
  }
}

// =====================================
//  Fonctions d'affichage du Flag
// =====================================

function showFlag() {
    // Verification du statut de l'échec
    const failedBefore = localStorage.getItem("phishing_fail");
    if (failedBefore === "true") {
        alert("❌ ÉCHEC du challenge. Vous vous etes fait avoir, revenez au prochain challenge.");
        return;
    }
    alert(`Voici la reponse : ${flag}`);
}


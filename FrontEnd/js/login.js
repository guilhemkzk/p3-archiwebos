function isValid(value) {
  return /^e[0-9]{3,}$/.test(value);
}

// sophie.bluel@test.tld
// S0phie

// FUNCTION CONNEXION
async function loginUser() {
  //Nettoyer les anciens messages d'erreurs si affichés
  let errMessage401 = document.getElementById("error401");
  let errMessage404 = document.getElementById("error404");
  errMessage401.setAttribute("style", "display : none");
  errMessage404.setAttribute("style", "display : none");

  let responseUser;
  // Test input user et nettoyage des caractères indésirable
  //function isValid > if yes  > on continue > sinon on bloque + msg d'erreur

  //Construction du body de la requête POST
  let loginUser = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const res = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    });

    if (res.status === 401) {
      errMessage401.removeAttribute("style");
    } else if (res.status === 404) {
      errMessage404.removeAttribute("style");
    } else if (res.status === 200) {
      //créer une variable globale avec user Id et Token puis aller sur accueil login OK
      responseUser = await res.json();
    }
  } catch (err) {
    console.log(err);
  }
}

// function sendData() {
//   const XHR = new XMLHttpRequest();

//   // Bind the FormData object and the form element
//   const FD = new FormData(form);

//   // Define what happens on successful data submission
//   XHR.addEventListener("load", (event) => {
//     alert(event.target.responseText);
//   });

//   // Define what happens in case of error
//   XHR.addEventListener("error", (event) => {
//     alert("Oops! Something went wrong.");
//   });

//   // Set up our request
//   XHR.open("POST", "https://example.com/cors.php");

//   // The data sent is what the user provided in the form
//   XHR.send(FD);
// }

// // Get the form element
// const form = document.getElementById("myForm");

// // Add 'submit' event handler
// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   sendData();
// });

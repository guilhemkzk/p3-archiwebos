function isValid(value) {
  return /^e[0-9]{3,}$/.test(value);
}

// sophie.bluel@test.tld
// S0phie

//isEmailValid(email)

//add variable to localstorage js

// FUNCTION TO CHECK ID AND PSW AND ALLOW CONNEXION
async function loginUser() {
  // Clean the old error messages displayed if applicable
  let errMessage = document.getElementById("error");
  errMessage.style.display = "none";

  // Test input user et nettoyage des caractères indésirable
  //function isValid > if yes  > on continue > sinon on bloque + msg d'erreur

  // Get the user input for name and psw and build the POST request's body
  let loginUser = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    // API Call : POST to compare ID and PSW of the user to the DB
    const res = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // Convert the JS value into json string to write the body
      body: JSON.stringify(loginUser),
    });

    // Considering possible error messages and displaying error message if applicable
    // IF THERE IS AN ERROR CODE, DISPLAY ERROR MESSAGE
    if (res.status === 401 || res.status === 404) {
      errMessage.style.display = "block";
      // Changing the style of the div containing the error message to block to display it
      // IF THERE IS NO ERROR CODE, ALLOW CONNEXION
    } else if (res.status === 200) {
      // Create a variable to get the ID and TOKEN proving that the connexion is OK
      let user = await res.json();
      // Sending ID and TOKEN in LOCAL STORAGE
      localStorage.setItem("id", user.userId);
      localStorage.setItem("token", user.token);

      // Loading the index page by calling loadWorks.js
      location.href = "./index.html";
    }
  } catch (err) {
    console.log(err);
  }
}

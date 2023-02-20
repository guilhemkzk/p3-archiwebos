//
//
//
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// -------------------------- REGEX - TEST IS THE EMAIL IS VALID --------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
//
//
//
function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
//
//
//

//
//
//
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ---------------------- CHECK ID AND PASSWORD TO ALLOW CONNEXION ------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
//
//
//

formConnect.onsubmit = async (e) => {
  // Prevent page from reloading
  e.preventDefault();
  // Clean the old error messages displayed if applicable
  let errMessage = document.getElementById("error");
  errMessage.style.display = "none";
  //Checking if the user email input is valid using REGEX
  // IF THE USER EMAIL IS VALID
  if (validateEmail(document.getElementById("email").value)) {
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

        // Loading the index page
        location.href = "./index.html";
      }
    } catch (err) {
      console.log(err);
    }
    // ELSE, IF THE USER EMAIL IS INVALID :
  } else {
    // Display error message
    errMessage.style.display = "block";
  }
};

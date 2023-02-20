//
//
//
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ------------------------------------ CONNEXION ------------------------------------------ //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
//
//
//

// Getting 'true' if the token exist, then the user is connected
const isUserConnected = localStorage.getItem("token") !== null;

// IF THE USER IS CONNECTED, DISPAY EDITION PARAMETERS
if (isUserConnected) {
  // Get all the HTML items with class "edition"
  // and set their display to "flex" to make them visible
  document
    .querySelectorAll(".edition")
    .forEach((a) => (a.style.display = "flex"));

  // Display the logout option using "display : block"
  let logoutOption = document.getElementById("logout");
  logoutOption.style.display = "block";

  // Hide the login option using "display : none"
  let loginOption = document.getElementById("login");
  loginOption.style.display = "none";

  //Display the black edition bar using "display : flex"
  let blackStripEdition = document.getElementById("edition-banner");
  blackStripEdition.style.display = "flex";

  //Hide the filtering options
  let sortingDiv = document.getElementById("tri");
  sortingDiv.style.display = "none";
  // ELSE IF THE USER IS NOT CONNECTED
} else {
  // Get all the HTML items with class "edition"
  //and set their display to "none"
  document
    .querySelectorAll(".edition")
    .forEach((a) => (a.style.display = "none"));

  // Hide the logout option using "display : none"
  let logoutOption = document.getElementById("logout");
  logoutOption.style.display = "none";
  // Display the login option using "display : block"
  let loginOption = document.getElementById("login");
  loginOption.style.display = "block";
  //Hide the black edition bar using "display : none"
  let blackStripEdition = document.getElementById("edition-banner");
  blackStripEdition.style.display = "none";
}

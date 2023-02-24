// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ------------------------------------ CONNEXION ------------------------------------------ //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //

// Getting 'true' if the token exist, then the user is connected
const isUserConnected = localStorage.getItem("token") !== null;

// IF THE USER IS CONNECTED, DISPAY EDITION PARAMETERS
if (isUserConnected) {
  // Get all the HTML items with class "edition"
  // and set their display to "flex" to make them visible
  document
    .querySelectorAll(".edition")
    .forEach((a) => (a.style.display = "flex"));

  // Get the div used to display login or logout
  let loginLogoutSwitch = document.getElementById("login-logout-switch");
  // Change the text to : Modifier ; when a picture is displayed
  loginLogoutSwitch.innerHTML =
    "<button class='basic-typo hidden-button' id='logout'>logout</button>";

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

  //Hide the black edition bar using "display : none"
  let blackStripEdition = document.getElementById("edition-banner");
  blackStripEdition.style.display = "none";

  // Set the login button on login setup

  // Get the div used to display login or logout
  let loginLogoutSwitch = document.getElementById("login-logout-switch");
  // Change the text to : Modifier ; when a picture is displayed
  loginLogoutSwitch.innerHTML = "<a href='./login.html' id='login'>login</a>";
}

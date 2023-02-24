// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// --------------------------------------- LOGOUT ------------------------------------------ //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //

// Get the HTML element used to logout and add a event listener to it
document.getElementById("logout").addEventListener("click", function () {
  // Clear all local storage session
  window.localStorage.clear();
  // Redirect to the index.html page (reload)
  location.href = "./index.html";
});

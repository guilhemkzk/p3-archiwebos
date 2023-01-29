// Get the container of the gallery of works
let gallery = document.getElementById("gallery-container");

// FUNCTION TO GET ALL THE WORKS USING API CALL
async function getWorks() {
  //intiate variable
  let allWorks;
  try {
    // Call API : GET all works
    const res = await fetch("http://localhost:5678/api/works");
    // Wait for the answer (async) and send it to the variable
    allWorks = await res.json();
    // Write the works in the gallery with the dedicated fonction
    const returnWorks = (allWorks) => {
      // Function to create HTML from API response in order to send it to the gallery
      return (
        '<div class="gallery">' +
        allWorks
          .map(
            (allWorks) => `
      <figure>
        <img crossorigin="anonymous" src="${allWorks.imageUrl}" alt="${allWorks.title}" />
        <figcaption>${allWorks.title}</figcaption>
        </figure>`
          )
          .join("") +
        "</div>"
      );
    };
    // Send the content written in the HTML page (errasing what was written previously)
    gallery.innerHTML = returnWorks(allWorks);
  } catch (err) {
    console.log(err);
  }
}

getWorks();

// Get the id of the element containing the sorting buttons
let filterDiv = document.getElementById("tri");

// FUNCTION TO GET THE CATEGORIES TO CREATE FILTERING BUTTONS
async function getCategories() {
  // initiate variable
  let allCategories;

  try {
    // Call API : GET all categories
    const res = await fetch("http://localhost:5678/api/categories");
    // Wait for the answer (async) and send it to the variable in json
    allCategories = await res.json();
    //Use the categories to create HTML buttons in order to send it to the page
    const returnCategories = (allCategories) => {
      return (
        '<button class="sorting-btn" type="button" autofocus id="all">Tous</button>' +
        allCategories
          .map(
            (allCategories) => `
            <button class="sorting-btn" type="button" id="${allCategories.id}">${allCategories.name}</button>`
          )
          .join("")
      );
    };
    // Send the content written in the HTML page
    filterDiv.innerHTML = returnCategories(allCategories);
  } catch (err) {
    console.log(err);
  }
}

getCategories();

// --------------------- CONNEXION --------------------- //

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
  let blackStripEdition = document.getElementById("bandeau-edition");
  blackStripEdition.style.display = "flex";

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
  let blackStripEdition = document.getElementById("bandeau-edition");
  blackStripEdition.style.display = "none";
}

// FUNCTION LOGOUT
async function logout() {
  // Clear all local storage session
  window.localStorage.clear();
  // Redirect to the index.html page (reload)
  location.href = "./index.html";
}

// --------------------- MODAL --------------------- //

// OPEN THE MODAL //

async function getModal() {
  var modal = document.getElementById("modale");
  modal.style.display = "flex";
}

// CLOSE THE MODAL //
var modal = document.getElementById("modale");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// // ------------ EVENT LISTENER FOR THE EDITING LINK FOR THE GALLERY ----------- //
// window.addEventListener("load", function () {
//   // Get the button that opens the modal
//   let openModalLink = document.getElementById("edition-gallery");
//   openModalLink.addEventListener("click", function () {
//     modal.style.display = "block";
//   });
// });

// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// #region --------------------------POPULATE  GALLERY WITH WORKS -------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //

// Get the container of the gallery of works
let gallery = document.getElementById("gallery-container");

// FUNCTION TO CREATE HTML FROM API WORKS IN ORDRE TO SEND IT TO THE GALLERY
async function writeGallery(works) {
  return (
    '<div class="gallery">' +
    works
      .map(
        (works) => `
  <figure>
    <img crossorigin="anonymous" src="${works.imageUrl}" alt="${works.title}" />
    <figcaption>${works.title}</figcaption>
    </figure>`
      )
      .join("") +
    "</div>"
  );
}

// GET ALL WORKS USING API CALL
async function getWorks(location) {
  //intiate variable
  let allWorks;
  try {
    // Call API : GET all works
    const res = await fetch("http://localhost:5678/api/works");
    // Wait for the answer (async) and send it to the variable
    allWorks = await res.json();
    // Write the works in the gallery with the dedicated fonction
    const returnWorks = await writeGallery(allWorks);
    // Send the content written in the HTML page (errasing what was written previously)
    location.innerHTML = returnWorks;
  } catch (err) {
    console.log(err);
  }
}

getWorks(gallery);

// #endregion

// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// #region --------------------------CREATING THE SORTING BUTTONS -------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //

//
//
// ----------------------------------------------------------------------------------------- //
// STEP 1 - CREATING THE HTML BUTTONS FROM CATEGORIES [API]
// ----------------------------------------------------------------------------------------- //
//
//

// Get the id of the element containing the sorting buttons
let filterDiv = document.getElementById("tri");

// FUNCTION TO GET THE CATEGORIES FROM API
async function getCategories(location) {
  // initiate variable
  let allCategories;

  try {
    // Call API : GET all categories
    const res = await fetch("http://localhost:5678/api/categories");
    // Wait for the answer (async) and send it to the variable in json
    allCategories = await res.json();
    //Use the categories to create HTML buttons in order to send it to the page
    const returnCategories = (allCategories) => {
      return allCategories
        .map(
          (allCategories) => `
            <button class="sorting-btn btn btn-typo" type="button" id="sorting-btn-${allCategories.id}">${allCategories.name}</button>`
        )
        .join("");
    };
    // Send the content written in the HTML page
    location.innerHTML += returnCategories(allCategories);

    //
    //
    // ----------------------------------------------------------------------------------------- //
    // STEP 2 - ADD AN EVENT LISTENER TO EACH SORTING BUTTON + THE ALL BUTTON
    // ----------------------------------------------------------------------------------------- //
    //
    //

    // Get the elements where the buttons are created just before and sent to HTML
    let filterBtns = document.getElementsByClassName("sorting-btn");

    //EVENTS LISTENERS FOR CATEGORIES BUTTONS AND LOAD WORKS BY CATEGORIES
    for (let i = 0; i < filterBtns.length; i++) {
      //Get the category id from the id name : get the last item of the string = the category number
      let btnCategoryId = filterBtns[i].id.charAt(filterBtns[i].id.length - 1);
      //For each categorie
      filterBtns.item(btnCategoryId - 1).addEventListener("click", function () {
        //Create an event listener for each button
        filterWorks(btnCategoryId);

        //Call the function that filter the works for each categorie that will write directly in the gallery, erasing previous content
      });
    }

    // CREATING THE EVENT LISTENER FOR THE ALREADY EXISTING ALL BUTTON
    // Get the button from the html
    let allBtn = document.getElementById("btn-all");

    // Autofocus on the ALL button
    allBtn.focus();
    allBtn.style.outline = "none";

    //EVENT LISTENER FOR ALL BUTTON AND LOAD ALL WORKS
    allBtn.addEventListener("click", function () {
      //call function that get and display all works in the gallery, erasing what was before
      getWorks(gallery);
    });
  } catch (err) {
    console.log(err);
  }
}

getCategories(filterDiv);

//
//
// ----------------------------------------------------------------------------------------- //
// STEP 3 - FILTER THE GALLERY
// ----------------------------------------------------------------------------------------- //
//
//

// FILTER THE WORKS REGARDING THEIR CATEGORY
async function filterWorks(id) {
  //input parameter is "categoryId" from API
  //intiate variable
  let allWorks;
  try {
    // Call API : GET all works
    const res = await fetch("http://localhost:5678/api/works");
    // Wait for the answer (async) and send all works to the variable in json
    allWorks = await res.json();
    // Filter all the wor
    let filteredWorks = allWorks.filter(
      // filter allWorks for each catgorie regarding the input "categoryId"
      (allWorks) => allWorks.categoryId == id
    );
    // Write the works in the gallery with the dedicated fonction
    const returnFilteredWorks = await writeGallery(filteredWorks);
    // Send the content written in the HTML page (errasing what was written previously)
    gallery.innerHTML = returnFilteredWorks;
  } catch (err) {
    console.log(err);
  }
}

// #endregion

// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// #region ------------------------OPENING THE FIRST EDITION MODAL ------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //

//
//
// ----------------------------------------------------------------------------------------- //
// OPENING THE FIRST MODAL AND POPULATING IT
// ----------------------------------------------------------------------------------------- //
//
//

async function getModal() {
  var modal = document.getElementById("modal-gallery");
  modal.style.display = "flex";

  // CREATING GALLERY IN THE MODAL

  // Get the container of the gallery
  let editGallery = document.getElementById("gallery-edit");

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
        allWorks
          .map(
            (allWorks) => `
            <div class="modal-overlay-container">

              <div class="trash-can-icon" id="trash-can-icon-${allWorks.id}">
                <a href="#" onclick="javascript:deleteWork(${allWorks.id});">
                  <i class="fa-regular fa-trash-can fa-sm"></i>
                </a>
              </div>

              <figure id="modal-fg-${allWorks.id}">
                <img id="modal-img-${allWorks.id}" crossorigin="anonymous" src="${allWorks.imageUrl}" alt="${allWorks.title}" />
                <figcaption>éditer</figcaption>
              </figure>

              <div class="size-icon" id="size-icon-${allWorks.id}">
                <i class="fa-solid fa-arrows-up-down-left-right"></i>
              </div>

            </div>`
          )
          .join("") + "</div>"
      );
    };
    // Send the content written in the HTML page (errasing what was written previously)
    editGallery.innerHTML = returnWorks(allWorks);
  } catch (err) {
    console.log(err);
  }
}

document
  .getElementById("open-first-modal")
  .addEventListener("click", function () {
    getModal();
  });

//
// ----------------------------------------------------------------------------------------- //
// CLOSE THE MODAL
// ----------------------------------------------------------------------------------------- //
//
//

var modal = document.getElementById("modal-gallery");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// #endregion

// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// #region --------------------DELETING A WORK (FROM THE FIRST MODAL) ---------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //

// IF GUARDIAN
function isConnected() {
  const userToken = localStorage.getItem("token");
  if (userToken) {
    return userToken;
  } else {
    console.log("Erreur, utilisateur non connecté");
    return false;
  }
}

//
// ----------------------------------------------------------------------------------------- //
// DELETE A WORK (API CALL)
// ----------------------------------------------------------------------------------------- //
//
//

async function deleteWork(id) {
  // Get the token of the user
  let token = isConnected();

  if (!token) {
    console.log("Utilisateur non connecté");
    return false;
  }

  try {
    // API Call : POST to compare ID and PSW of the user to the DB
    const res = await fetch("http://localhost:5678/api/works/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // Considering possible error messages and displaying error message if applicable
    // IF THERE IS AN ERROR CODE, DISPLAY ERROR MESSAGE
    if (res.status === 401) {
      window.alert("Erreur, manoeuvre non autorisée");
      // Changing the style of the div containing the error message to block to display it
      // IF THERE IS NO ERROR CODE, ALLOW CONNEXION
    } else if (res.status === 500) {
      window.alert(
        "Une erreur est survenue, veuillez réessayer ultérieurement"
      );
    } else {
      // Create a variable to get the ID and TOKEN proving that the connexion is OK
      // window.alert("Element supprimé avec succès");
      location.href = "./index.html";
      // Loading the index page by calling loadWorks.js
    }
  } catch (err) {
    console.log(err);
  }
}

// #endregion

// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// #region ---------------------- OPENING SECOND MODAL (ADD PICTURE) ----------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //

//
//
// ----------------------------------------------------------------------------------------- //
// DISPLAY SECOND MODAL
// ----------------------------------------------------------------------------------------- //
//
//

document
  .getElementById("open-second-modal")
  .addEventListener("click", function () {
    // Get element that contain the modal in HTML, and display it
    let modalAddPicture = document.getElementById("modal-add-picture");
    modalAddPicture.style.display = "flex";

    // Close the first modal
    document.getElementById("modal-gallery").style.display = "none";
  });

//
//
// ----------------------------------------------------------------------------------------- //
// GET THE CATEGORIES TO DISPLAY THE DROPDOWN LIST
// ----------------------------------------------------------------------------------------- //
//
//

// GET THE CATEGORIES FROM API
async function getListCategories(location) {
  // initiate variable
  let allCategories;

  try {
    // Call API : GET all categories
    const res = await fetch("http://localhost:5678/api/categories");
    // Wait for the answer (async) and send it to the variable in json
    allCategories = await res.json();
    //Use the categories to create HTML buttons in order to send it to the page

    const returnCategories = (allCategories) => {
      return allCategories
        .map(
          (allCategories) => `
            <option value="${allCategories.id}">${allCategories.name}</option>`
        )
        .join("");
    };
    // Send the content written in the HTML page
    location.innerHTML += returnCategories(allCategories);
  } catch (err) {
    console.log(err);
  }
}

//Get the html element that containt the selection of category
let selectOption = document.getElementById("category");

getListCategories(selectOption);

//
//
// ----------------------------------------------------------------------------------------- //
// CLOSE SECOND MODAL
// ----------------------------------------------------------------------------------------- //
//
//

// Get the HTML <div> that display the picture
let modalAddPicture = document.getElementById("modal-add-picture");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modalAddPicture.style.display = "none";
};

////////////////////////////////////////////////////////////////////////////////
////////////////// THIS IS FOR THE TWO MODALS //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// When the user clicks anywhere outside of the modals, close it
window.onclick = function (event) {
  if (event.target == modal || event.target == modalAddPicture) {
    modalAddPicture.style.display = "none";
    modal.style.display = "none";
  }
};
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

//
//
// ----------------------------------------------------------------------------------------- //
// RETURN ARROW OF THE SECOND MODAL > RETURN TO THE FIRST ONE
// ----------------------------------------------------------------------------------------- //
//
//

// Get the return arrow in HTML
var returnArrow = document.getElementsByClassName("close-arrow")[0];
// When the user clicks on arrow, close the second modal and re-open the first one
returnArrow.onclick = function () {
  modal.style.display = "flex";
  modalAddPicture.style.display = "none";
};

// #endregion

// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// #region -------------------------------- UPLOAD PICTURE --------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //

//
// --------------------------------- INITIATE VARIABLES -------------------------------------//
//

// Get the html elements for input image
let input = document.querySelector("input");
// Get the html elements for output image > to display the preview
let output = document.querySelector("output");
// Create an empty array to contain the image
let imagesArray = [];

//
// ------------------------------------ APPEARANCE CHANGES ---------------------------------//
//

// Summarize all the displays to change if no image is entered or if the image is invalid
async function invalidImageChanges() {
  // Get the div where the image symbol is displayed
  let photoDisplayArea = document.getElementById("img-display-area");
  // Get the div where the image itself is displayed
  let imagePreview = document.getElementById("image-preview");
  // Get the html btn that valid the form
  let validateBtnSendPicture = document.getElementById("btn-valid-add-picture");

  //Clean the display and remove a previous image
  photoDisplayArea.style.display = "flex";
  imagePreview.style.display = "none";

  // Put the disabled option and change the appearance
  validateBtnSendPicture.disabled = true;
  // Remove disable parameter on the "valider" btn
  validateBtnSendPicture.className = "btn-typo btn-disabled";
}

//
// ---------------------------------- ERROR MANAGEMENT ---------------------------------//
//

// Synthetize all the error management processes
function errorManagement(file) {
  // Clean the old error messages displayed if applicable
  let errMessage = document.getElementById("error-size-format");
  errMessage.innerHTML = "";

  // Check if the size of the file is under 4Mo
  if (file[0].size > 4000000) {
    invalidImageChanges();
    // Display error message
    errMessage.innerHTML = "Fichier trop volumineux";
    return false;
  }

  // Check if the extension of the file is authorized
  // Allowing file type
  let validFileExtensions = ["jpg", "jpeg", "png"];

  // Get the extension of the file
  let fileExtension = file[0].name.split(".")[1].toLowerCase();

  // Check if the file match the prerequies
  if (validFileExtensions.includes(fileExtension) != true) {
    invalidImageChanges();
    errMessage.innerHTML = "Format non supporté";
    return false;
  }
}

//
// ------------------------------ EVENT LISTENER ON INPUT IMAGE -------------------------------//
//

// Event Listener on the input file >>>> if it changes
input.addEventListener("change", function () {
  // Get the button used to add the picture (+ Ajouter photo)
  let addPictureButton = document.getElementById("add-picture-button");
  // Change the text to : Modifier ; when a picture is displayed
  addPictureButton.textContent = "+ Ajouter photo";

  // Get the file uploaded by the user
  const file = input.files;

  // Call the function for error management, if the result is false, there is an error in size or format
  if (errorManagement(file) == false) {
    return false;
  }

  // Add the file into the array
  imagesArray[0] = file[0];
  // Function to display the image
  displayPicture();

  // Get the html btn that valid the form
  let validateBtnSendPicture = document.getElementById("btn-valid-add-picture");
  // Remove the disabled option and change the appearance
  validateBtnSendPicture.disabled = false;
  // Remove disable parameter on the "valider" btn
  validateBtnSendPicture.className =
    "btn-typo btn-disabled btn-disabled-activated";
});

//
// ------------------------------------ DISPLAY PICTURE -----------------------------------//
//

// Display a preview of the image uploaded by the user
function displayPicture() {
  // Initiate
  let images = "";
  // For each image create a div that will
  // allow to display the image in the page
  imagesArray.forEach((image) => {
    images += `<div class="image">
                <img src="${URL.createObjectURL(image)}" alt="image">
              </div>`;
  });
  // Push the HTML code into the output div and erase previous code
  output.innerHTML = images;

  // Get HTML element containing the logo when there is no picture
  let photoDisplayArea = document.getElementById("img-display-area");
  // Get HTML element containing image preview
  let imagePreview = document.getElementById("image-preview");
  // Remove the logo
  photoDisplayArea.style.display = "none";
  // Display the image
  imagePreview.style.display = "flex";

  // Get the button used to add the picture (+ Ajouter photo)
  let addPictureButton = document.getElementById("add-picture-button");
  // Change the text to : Modifier ; when a picture is displayed
  addPictureButton.textContent = "Modifier";
}

//
// --------------------------------- SEND PICTURE TO SERVER --------------------------------//
//

// On submit of the form
formElem.onsubmit = async (e) => {
  // Prevent page from reloading
  e.preventDefault();

  // IF GUARDIAN
  let token = isConnected();

  if (!token) {
    console.log("Utilisateur non connecté");
    return false;
  }

  // Get html element containing the form
  let formElem = document.getElementById("formElem");

  try {
    // API Call : POST to send the image and data in the server
    const res = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      // Convert the JS value into FormData to write the body
      body: new FormData(formElem),
    });

    // Considering possible error messages and displaying error message if applicable
    // IF THERE IS AN ERROR CODE, DISPLAY ERROR MESSAGE
    if (res.status === 401 || res.status === 404) {
      console.log("erreur 401 ou 404");
      // Changing the style of the div containing the error message to block to display it
      // errMessage.style.display = "block";
    } else if (res.status === 201) {
      //Return to the index page
      location.href = "./index.html";
    }
  } catch (err) {
    console.log(err);
  }
};

// #endregion

// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ---------------------------- POPULATE THE GALLERY WITH WORKS ---------------------------- //
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

// FUNCTION TO GET ALL THE WORKS USING API CALL
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

// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ------------------------------ CREATING THE SORTING BUTTONS ----------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //

// STEP 1 - GETTING CATEGORIES FROM API AND CREATING THE HTML BUTTONS + THE ALL BUTTON

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
            <button class="sorting-btn" type="button" id="sorting-btn-${allCategories.id}">${allCategories.name}</button>`
        )
        .join("");
    };
    // Send the content written in the HTML page
    location.innerHTML += returnCategories(allCategories);
  } catch (err) {
    console.log(err);
  }
}

getCategories(filterDiv);

// STEP 2 - ADD AN EVENT LISTENER TO EACH SORTING BUTTON + THE ALL BUTTON

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

async function putEventListenerOnButtons() {
  await waitForElm(".sorting-btn");

  let allBtn = document.getElementById("btn-all");

  //AUTOFOCUS THE ALL BUTTON
  document.getElementById("btn-all").focus();
  //EVENT LISTENER FOR ALL BUTTON AND LOAD ALL WORKS
  allBtn.addEventListener("click", function () {
    //call function that get and display all works in the gallery, erasing what was before
    getWorks(gallery);
  });

  let filterBtns = document.getElementsByClassName("sorting-btn");
  console.log(filterBtns.length);
  // Get all the filter buttons created automatically from loadWorks.js using the categories from the API
  //EVENTS LISTENERS FOR CATEGORIES BUTTONS AND LOAD WORKS BY CATEGORIES
  for (let i = 0; i < filterBtns.length; i++) {
    //Get the category id from the id
    let btnCategoryId = filterBtns[i].id.charAt(filterBtns[i].id.length - 1);
    //For each categorie;
    console.log(btnCategoryId);
    filterBtns.item(btnCategoryId - 1).addEventListener("click", function () {
      //Create an event listener for each button
      filterWorks(btnCategoryId);

      //Call the function that filter the works for each categorie that will write directly in the gallery, erasing previous content
    });
  }
}

window.addEventListener("load", function () {
  putEventListenerOnButtons();
});

// STEP 3 - ACTION : WHEN BUTTON IS CLICKED, FILTER THE GALLERY

// FUNCTION TO FILTER THE WORKS REGARDING THEIR CATEGORY
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

// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// --------------------------- OPENING THE FIRST EDITION MODAL ----------------------------- //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //

async function getModal() {
  var modal = document.getElementById("modal-gallery");
  modal.style.display = "flex";

  // CREATING GALLERY IN THE MODAL

  // Get the container of the gallery
  let editGallery = document.getElementById("edit-gallery");

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
          .join("") +
        "</div>"
      );
    };
    // Send the content written in the HTML page (errasing what was written previously)
    editGallery.innerHTML = returnWorks(allWorks);
  } catch (err) {
    console.log(err);
  }
}

// CLOSE THE MODAL //
var modal = document.getElementById("modal-gallery");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ------------------------- DELETING A WORK (FROM THE FIRST MODAL) ------------------------ //
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
      window.alert("Element supprimé avec succès");
      location.href = "./index.html";
      // Loading the index page by calling loadWorks.js
    }
  } catch (err) {
    console.log(err);
  }
}

// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //
// ------------------------- OPENING SECOND MODAL (ADD PICTURE) ------------------------ //
// ----------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------- //

let selectOption = document.getElementById("category");

// FUNCTION CALLED TO DISPLAY THE SECOND MODAL
async function getModalPicture() {
  // Display the second modal
  let modalAddPicture = document.getElementById("modal-add-picture");
  modalAddPicture.style.display = "flex";

  // Close the first modal
  document.getElementById("modal-gallery").style.display = "none";
}

// GETTING THE CATEGORIES TO DISPLAY THE DROPDOWN LIST
// FUNCTION TO GET THE CATEGORIES FROM API
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

getListCategories(selectOption);

// CLOSE THE SECOND MODAL (PICTURE) //

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modalAddPicture.style.display = "none";
};
let modalAddPicture = document.getElementById("modal-add-picture");

////////////////// THIS IS FOR THE TWO MODALS //////////////////////////////////
// When the user clicks anywhere outside of the modals, close it
window.onclick = function (event) {
  if (event.target == modal || event.target == modalAddPicture) {
    modalAddPicture.style.display = "none";
    modal.style.display = "none";
  }
};
///////////////////////////////////////////////////////////////////////////////////

// RETURN ARROW OF THE SECOND MODAL TO RETURN TO THE FIRST ONE
var returnArrow = document.getElementsByClassName("return-arrow")[0];
// When the user clicks on arrow, close the second modal and re-open the first one
returnArrow.onclick = function () {
  modal.style.display = "flex";
  modalAddPicture.style.display = "none";
};

// ----------- UPLOAD PICTURE FROM THE SECOND MODAL ------------------//

// Get the html elements for input image
let input = document.querySelector("input");
// Get the html elements for output image > to display the preview
let output = document.querySelector("output");
// Create an empty array to contain the image
let imagesArray = [];

// Put an event Listener on the input file; if it changes
input.addEventListener("change", function () {
  // Get the file chosen by the user
  const file = input.files;
  // Add the file into the array
  imagesArray.push(file[0]);
  // Function to display the image
  uploadPicture();
});

function uploadPicture() {
  let images = "";
  // For each image on the index of the arraw, create a div that will
  // allow to display the image in the page
  imagesArray.forEach((image, index) => {
    images += `<div class="image">
                <img src="${URL.createObjectURL(image)}" alt="image">
              </div>`;
  });
  // Push the HTML code into the output div and erase previous code
  output.innerHTML = images;
  let photoDisplayArea = document.getElementById("photo-display-area");
  let imagePreview = document.getElementById("image-preview");
  photoDisplayArea.style.display = "none";
  imagePreview.style.display = "flex";
}

// // Function to delete an image from the arraw, regarding its index
// function deleteImage(index) {
//   imagesArray.splice(index, 1);
//   displayImages();
// }
// {`<span onclick="deleteImage(${index})">&times;</span>`}

// ---------------------------------------------------------------//
// ----------------- SEND PICTURE IN THE SERVER ------------------//
// ---------------------------------------------------------------//

// Get the button that validate the form
// let validateBtnSendPicture = document.getElementById("btn-valid-add-picture");
// console.log(validateBtnSendPicture.value);
// //remove disable parameter
// if (validateBtnSendPicture.value != null) {
//   validateBtnSendPicture.disabled = false;
// }

formElem.onsubmit = async (e) => {
  e.preventDefault();

  // IF GUARDIAN
  let token = isConnected();

  if (!token) {
    console.log("Utilisateur non connecté");
    return false;
  }

  let formElem = document.getElementById("formElem");

  try {
    // API Call : POST to send the image and data in the server
    const res = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      // Convert the JS value into json string to write the body
      body: new FormData(formElem),
    });

    // Considering possible error messages and displaying error message if applicable
    // IF THERE IS AN ERROR CODE, DISPLAY ERROR MESSAGE
    if (res.status === 401 || res.status === 404) {
      console.log("erreur 401 ou 404");
      // errMessage.style.display = "block";
      // Changing the style of the div containing the error message to block to display it
    } else if (res.status === 201) {
      // Create a variable to get the ID and TOKEN proving that the connexion is OK
      let response = await res.json();
      console.log(response);
      // Loading the index page by calling loadWorks.js
      // location.href = "./index.html";
    }
  } catch (err) {
    console.log(err);
  }
};

// async function sendPicture() {
//   // Get the elements input by the user

//   let formElem = document.getElementById("form-elem");
//   let newPictureForm = new FormData();
//   newPictureForm.append("image", document.getElementById("image").value);
//   newPictureForm.append("title", document.getElementById("title").value);
//   newPictureForm.append(
//     "category",
//     parseInt(document.getElementById("category").value)
//   );

//   // IF GUARDIAN
//   let token = isConnected();

//   if (!token) {
//     console.log("Utilisateur non connecté");
//     return false;
//   }

//   try {
//     // API Call : POST to send the image and data in the server
//     const res = await fetch("http://localhost:5678/api/works", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         Authorization: "Bearer " + token,
//       },
//       // Convert the JS value into json string to write the body
//       body: newPictureForm,
//     });

//     // Considering possible error messages and displaying error message if applicable
//     // IF THERE IS AN ERROR CODE, DISPLAY ERROR MESSAGE
//     if (res.status === 401 || res.status === 404) {
//       console.log("erreur 401 ou 404");
//       // errMessage.style.display = "block";
//       // Changing the style of the div containing the error message to block to display it
//     } else if (res.status === 201) {
//       // Create a variable to get the ID and TOKEN proving that the connexion is OK
//       let response = await res.json();
//       console.log(response);
//       // Loading the index page by calling loadWorks.js
//       location.href = "./index.html";
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   // ELSE, IF THE USER EMAIL IS INVALID :
// }

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

// --------------------- MODAL --------------------- //

// FUNCTION TO LOAD ALL THE WORKS IN THE MODAL

// async function getEditWorks() {
//   //intiate variable
//   let allWorks;
//   try {
//     // Call API : GET all works
//     const res = await fetch("http://localhost:5678/api/works");
//     // Wait for the answer (async) and send it to the variable
//     allWorks = await res.json();
//     // Write the works in the gallery with the dedicated fonction
//     const returnWorks = (allWorks) => {
//       // Function to create HTML from API response in order to send it to the gallery
//       return (
//         '<div class="gallery">' +
//         allWorks
//           .map(
//             (allWorks) => `
//             <div>Test</div>
//         <figure>
//         <img crossorigin="anonymous" src="${allWorks.imageUrl}" alt="${allWorks.title}" />
//         <figcaption>éditer</figcaption>
//         </figure>`
//           )
//           .join("") +
//         "</div>"
//       );
//     };
//     // Send the content written in the HTML page (errasing what was written previously)
//     gallery.innerHTML = returnWorks(allWorks);
//   } catch (err) {
//     console.log(err);
//   }
// }

// OPEN THE MODAL //

async function getModal() {
  var modal = document.getElementById("modale");
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
        <figure>
        <div class="size-icon" id="size-icon-${allWorks.id}">
        <i class="fa-solid fa-arrows-up-down-left-right"></i>
        </div>
        <img id="modal-img-${allWorks.id}" crossorigin="anonymous" src="${allWorks.imageUrl}" alt="${allWorks.title}" />
        <figcaption>éditer</figcaption>
        </figure>
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

//----------------------------- DELETE A WORK --------------------------------//

async function deleteWork(id) {
  // Get the token of the user

  const userToken = localStorage.getItem("token");
  console.log(userToken);
  // IF the user is connected (true)
  if (userToken !== null) {
    // API CALL TO DELETE THE WORK

    try {
      // API Call : POST to compare ID and PSW of the user to the DB
      const res = await fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userToken,
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
  } else {
    console.log("Erreur");
  }
}

// LISTEN TO THE EVENT OF SELECTING A TRASH ICON TO CALL FUNCTION

// //EVENTS LISTENER

// for (let i = 0; i < trashIcons.length; i++) {
//   //For each categorie
//   trashIcons.item(trashIcons[i].id).addEventListener("click", function () {
//     //Create an event listener for each button
//     console.log("click");
//     //Call the function that filter the works for each categorie that will write directly in the gallery, erasing previous content
//   });
// }

// Get the container of the gallery of works
let galleryContainer = document.getElementById("gallery-container");

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
async function getWorks() {
  //intiate variable
  let allWorks;
  try {
    // Call API : GET all works
    const res = await fetch("http://localhost:5678/api/works");
    // Wait for the answer (async) and send it to the variable in json
    allWorks = await res.json();
    // Write the works in the gallery with the dedicated fonction
    const returnWorks = await writeGallery(allWorks);
    // Send the content written in the HTML page (errasing what was written previously)
    galleryContainer.innerHTML = returnWorks;
  } catch (err) {
    // catch error
    console.log(err);
  }
}

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
    galleryContainer.innerHTML = returnFilteredWorks;
  } catch (err) {
    console.log(err);
  }
}
// window.addEventListener("load", function () {
// document.addEventListener("DOMContentLoaded", function(){
//   // Code here waits to run until the DOM is loaded.
// });

// ---------------- EVENT LISTENER TO CATCH SORTING BUTTON ----------- //
window.addEventListener("load", function () {
  let filterBtns = document.getElementsByClassName("sorting-btn");

  // Get all the filter buttons created automatically from loadWorks.js using the categories from the API
  //EVENTS LISTENERS FOR CATEGORIES BUTTONS AND LOAD WORKS BY CATEGORIES
  for (let i = 0; i < filterBtns.length; i++) {
    //For each categorie
    filterBtns.item(filterBtns[i].id).addEventListener("click", function () {
      //Create an event listener for each button
      filterWorks(filterBtns[i].id);
      //Call the function that filter the works for each categorie that will write directly in the gallery, erasing previous content
    });
  }

  let allBtn = document.getElementById("all");
  // Get the button created manually that contain all categories
  //EVENT LISTENER FOR ALL BUTTON AND LOAD ALL WORKS
  allBtn.addEventListener("click", function () {
    //call function that get and display all works in the gallery, erasing what was before
    getWorks();
  });
});

let galleryContainer = document.getElementById("gallery-container");

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

async function getWorks() {
  let allWorks;

  try {
    const res = await fetch("http://localhost:5678/api/works");

    allWorks = await res.json();

    const returnWorks = await writeGallery(allWorks);

    // const returnWorks = (allWorks) => {
    //   return (
    //     '<div class="gallery">' +
    //     allWorks
    //       .map(
    //         (allWorks) => `
    //   <figure>
    //     <img crossorigin="anonymous" src="${allWorks.imageUrl}" alt="${allWorks.title}" />
    //     <figcaption>${allWorks.title}</figcaption>
    //     </figure>`
    //       )
    //       .join("") +
    //     "</div>"
    //   );
    // };

    galleryContainer.innerHTML = returnWorks;
  } catch (err) {
    console.log(err);
  }
}

async function filterWorks(i) {
  let allWorks;

  try {
    const res = await fetch("http://localhost:5678/api/works");

    allWorks = await res.json();

    let filteredWorks = allWorks.filter(
      // filter allWorks for each catgorie
      (allWorks) => allWorks.categoryId == i
    );

    const returnFilteredWorks = await writeGallery(filteredWorks);

    // const returnFilteredWorks = (filteredWorks) => {
    //   return (
    //     '<div class="gallery">' +
    //     filteredWorks
    //       .map(
    //         (filteredWorks) => `
    //   <figure>
    //     <img crossorigin="anonymous" src="${filteredWorks.imageUrl}" alt="${filteredWorks.title}" />
    //     <figcaption>${filteredWorks.title}</figcaption>
    //     </figure>`
    //       )
    //       .join("") +
    //     "</div>"
    //   );
    // };

    galleryContainer.innerHTML = returnFilteredWorks;
  } catch (err) {
    console.log(err);
  }
}

getWorks();

/* Ecouter un click */
window.addEventListener("load", function () {
  let filterBtns = document.getElementsByClassName("sorting-btn");

  let allBtn = document.getElementById("all");

  //EVENTS LISTENERS FOR CATEGORIES BUTTONS AND LOAD WORKS BY CATEGORIES
  for (let i = 0; i < filterBtns.length; i++) {
    //For each categorie
    filterBtns.item(filterBtns[i].id).addEventListener("click", function () {
      //create an event listener for each categorie/btn

      //call the function that filter the works for each categorie
      filterWorks(filterBtns[i].id);
    });
  }

  //EVENT LISTENER FOR ALL BUTTON AND LOAD ALL WORKS

  allBtn.addEventListener("click", function () {
    //call function that get all works
    getWorks();
  });
});

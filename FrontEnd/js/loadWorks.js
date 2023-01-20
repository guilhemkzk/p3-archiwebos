// GET ALL WORKS TO DISPLAY THE GALLERY

let gallery = document.getElementById("portfolio");

async function getWorks() {
  let allWorks;

  try {
    const res = await fetch("http://localhost:5678/api/works");

    allWorks = await res.json();

    const returnCards = (allWorks) => {
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

    gallery.insertAdjacentHTML("beforeend", returnCards(allWorks));
  } catch (err) {
    console.log(err);
  }
}

getWorks();

// GET THE CATEGORIES TO CREATE FILTERING BUTTONS

let tri = document.getElementById("tri");

async function getCategories() {
  let allCategories;

  try {
    const res = await fetch("http://localhost:5678/api/categories");

    allCategories = await res.json();

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

    tri.innerHTML = returnCategories(allCategories);
  } catch (err) {
    console.log(err);
  }
}

getCategories();

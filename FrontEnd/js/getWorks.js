let gallery = document.getElementById("portfolio"); // div class=gallery

async function foo() {
  let allWorks;

  const res = await fetch("http://localhost:5678/api/works");

  allWorks = await res.json();

  console.log(allWorks);

  function returnCards(allWorks) {
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
  }

  gallery.innerHTML = returnCards(allWorks);
}

foo();

// var obj;

// fetch("http://localhost:5678/api/works")
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .then((data) => {
//     obj = data;
//   })
//   .catch((err) => console.log(err));

// console.log(obj);

// fetch("http://localhost:5678/api/works")
//   .then(function (res) {
//     if (res.ok) {
//       return res.json();
//     }
//   })
//   .then(function (value) {
//     console.log(value);
//   })
//   .catch(function (err) {
//     // Une erreur est survenue
//   });

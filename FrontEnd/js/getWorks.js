// async function foo() {
//   let obj;

//   const res = await fetch("http://localhost:5678/api/works")

//   obj = await res.json();

//   console.log(obj);
// }

// foo();

var obj;

fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .then((data) => {
    obj = data;
  })
  .catch((err) => console.log(err));

console.log(obj);

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

// console.log(results);

// let gallery = document.getElementsByClassName("gallery"); // div class=gallery
// //let gallery = document.getElementById("portfolio").children;

// for (let i = 0; i < JSON.parse(JSON.stringify(results)).length; i++) {
//   let figure = gallery.appendChild(document.createElement("figure"));

//   figure.appendChild(document.createElement("img"));
//   figure.appendChild(document.createElement("figcaption"));
// }

// scripts/list.js

// Performance Optimization:
// Removed unused `getData` function.
// Refactored `appendD` to use `DocumentFragment` to batch DOM insertions.
// Implemented Event Delegation to reduce memory usage (O(1) listener vs O(N)).
// Removed duplicate IDs to ensure valid HTML and accessibility.

let cont = document.getElementById("prod-list");
let fav = document.getElementById("favorites");
let listlength = document.getElementById("listLength");

let res = JSON.parse(localStorage.getItem("list_id")) || [];

// Initial UI setup
updateHeader(res);

// Event Delegation
cont.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('remove-btn')) {
        const index = parseInt(target.dataset.index);
        removeItem(index);
    } else if (target.classList.contains('add-cart-btn')) {
        const index = parseInt(target.dataset.index);
        addToCart(res[index]);
    }
});

function updateHeader(data) {
    // ⚡ Bolt Optimization: Use textContent instead of innerHTML
    if (fav) fav.textContent = `Favorites     ${data.length} Items`;
    if (listlength) listlength.textContent = `Lists      1 Items`;
}

function appendD(data, container) {
  // ⚡ Bolt Optimization: Use textContent for clearing (faster than innerHTML)
  container.textContent = "";
  let fragment = document.createDocumentFragment();

  data.forEach(function (ele, index) {
    let rev = Math.round(Math.random() * 200) + 10;

    let div = document.createElement("div");
    div.className = "box";

    let image = document.createElement("img");
    image.src = ele.imageURL;
    image.loading = "lazy";
    image.decoding = "async";
    image.className = "poster"; // Using class instead of duplicate ID

    let name = document.createElement("p");
    name.className = "name";
    // ⚡ Bolt Optimization: Use textContent instead of innerText
    name.textContent = ele.name;

    let price = document.createElement("p");
    price.className = "price";
    price.textContent = `Sale Starts at INR ${ele.price}`;

    let rating = document.createElement("p");
    rating.className = "rating";

    // ⚡ Bolt Optimization: Use textContent with Unicode stars instead of innerHTML
    if (ele.rating > 0 && ele.rating <= 1.4) {
      rating.textContent = `${ele.rating} ⭐ `;
    } else if (ele.rating >= 1.5 && ele.rating < 2.4) {
      rating.textContent = `${ele.rating} ⭐ ⭐ `;
    } else if (ele.rating >= 2.5 && ele.rating <= 3.4) {
      rating.textContent = `${ele.rating} ⭐ ⭐ ⭐`;
    } else if (ele.rating >= 3.5 && ele.rating <= 4.4) {
      rating.textContent = `${ele.rating} ⭐⭐ ⭐ ⭐ (${rev})`;
    } else if (ele.rating >= 4.5) {
      rating.textContent = `${ele.rating} ⭐  ⭐ ⭐ ⭐ ⭐ (${rev})`;
    }

    let buttons = document.createElement("div");
    buttons.className = "buttons"; // Using class instead of duplicate ID

    let addCart_btn = document.createElement("button");
    addCart_btn.className = "add-cart-btn"; // Class for styling and selection
    addCart_btn.dataset.index = index;
    addCart_btn.textContent = "Add to Cart";

    let remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.className = "remove-btn"; // Class for styling and selection
    remove.dataset.index = index;

    buttons.append(addCart_btn, remove);
    div.append(image, price, rating, name, buttons);
    fragment.append(div);
  });

  container.append(fragment);
}

function removeItem(index) {
  res.splice(index, 1);
  localStorage.setItem("list_id", JSON.stringify(res));
  updateHeader(res); // Keep UI in sync
  appendD(res, cont);
}

var cart = JSON.parse(localStorage.getItem("cartItems")) || [];

function addToCart(data) {
  console.log(data);
  cart.push(data);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  alert("Cart added successfully");
}

appendD(res, cont);

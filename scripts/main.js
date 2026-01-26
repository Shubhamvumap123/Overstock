
function appendData(data, parent) {
  let fragment = document.createDocumentFragment();
  data.forEach((e) => {
    let rat = (Math.random() * 5).toFixed(1);

    // ⚡ Bolt Optimization: Use <a> tag instead of div + onclick for better semantics and accessibility.
    let anchor = document.createElement("a");
    anchor.className = "div1";
    anchor.href = "livingRoom.html";

    // Inline styles to match previous behavior and ensure block display
    anchor.style.display = "block";
    anchor.style.textDecoration = "none";
    anchor.style.color = "inherit";
    anchor.style.marginTop = "0"; // Reset potentially inherited margin from global 'a'

    let image = document.createElement("img");
    image.src = e.imgUrl;
    image.loading = "lazy";
    image.decoding = "async";
    // ⚡ Bolt Optimization: Use class instead of duplicate ID to ensure valid HTML.
    image.className = "poster";

    let rating = document.createElement("p");
    rating.className = "rating";
    // ⚡ Bolt Optimization: Use textContent with Unicode stars instead of innerHTML
    if (rat > 0 && rat <= 1.4) {
      rating.textContent = `${rat} ⭐ `;
    } else if (rat >= 1.5 && rat < 2.4) {
      rating.textContent = `${rat} ⭐ ⭐ `;
    } else if (rat >= 2.5 && rat <= 3.4) {
      rating.textContent = `${rat} ⭐ ⭐ ⭐`;
    } else if (rat >= 3.5 && rat <= 4.4) {
      rating.textContent = `${rat} ⭐  ⭐ ⭐ ⭐ `;
    } else if (rat >= 4.5) {
      rating.textContent = `${rat} ⭐  ⭐ ⭐ ⭐ ⭐`;
    }

    let name = document.createElement("p");
    name.textContent = e.name;
    name.className = "txtSmall";

    anchor.append(image, name, rating);
    fragment.append(anchor);
  });
  parent.append(fragment);
}

function appendD(res, cont) {
  cont.innerHTML = " ";
  let fragment = document.createDocumentFragment();
  res.forEach((ele) => {
    let rev = Math.round(Math.random() * 200) + 10;

    // ⚡ Bolt Optimization: Use <a> tag instead of div + onclick for better semantics and accessibility.
    let anchor = document.createElement("a");
    anchor.className = "box";
    anchor.href = "productPage.html";
    
    // Inline styles to match previous behavior and ensure block display
    anchor.style.display = "block";
    anchor.style.textDecoration = "none";
    anchor.style.color = "inherit";

    // Attach event listener for localStorage
    anchor.addEventListener('click', () => {
         localStorage.setItem("selected_id", JSON.stringify(ele._id));
    });

    let image = document.createElement("img");
    image.src = ele.imageURL;
    image.loading = "lazy";
    image.decoding = "async";
    // ⚡ Bolt Optimization: Use class instead of duplicate ID to ensure valid HTML.
    image.className = "poster";

    let name = document.createElement("p");
    name.className = "name";
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

    anchor.append(image, price, rating, name);
    fragment.append(anchor);
  });
  cont.append(fragment);
}

// ⚡ Bolt Optimization: Removed unused `getData` function.
export { appendData, appendD };

var cart = JSON.parse(localStorage.getItem("cartItems"))||[];
let left = document.getElementById("left");
var right = document.getElementById("right");

// Event Delegation for Remove buttons
// ⚡ Bolt Optimization: Use event delegation to reduce event listeners (O(N) -> O(1))
if (left) {
    left.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-btn')) {
            const index = parseInt(event.target.dataset.index);
            removeItem(index);
        }
    });
}

function display(cart)
{
    left.textContent = "";

    // 🎨 Palette: Add Empty State
    if (cart.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.style.textAlign = "center";
        emptyState.style.padding = "40px";
        emptyState.style.width = "100%";
        // 🎨 Palette: Fix layout issues caused by #left > div flex styles
        emptyState.style.display = "flex";
        emptyState.style.flexDirection = "column";
        emptyState.style.alignItems = "center";
        emptyState.style.justifyContent = "center";

        emptyState.innerHTML = `
            <h2>Your Cart is Empty</h2>
            <p style="margin: 20px 0;">Looks like you haven't added anything to your cart yet.</p>
        `;

        const shopBtn = document.createElement("button");
        shopBtn.textContent = "Start Shopping";
        shopBtn.id = "check_out"; // Reuse existing checkout button styles
        shopBtn.style.width = "auto";
        shopBtn.style.padding = "0 30px";
        shopBtn.style.marginLeft = "0";
        shopBtn.onclick = () => window.location.href = "index.html";

        emptyState.appendChild(shopBtn);
        left.appendChild(emptyState);

        // Hide right column
        if (right) {
            right.textContent = "";
            right.style.border = "none";
        }
        return;
    }

    // Performance optimization: Use DocumentFragment to batch DOM insertions
    // This reduces reflows from N to 1
    const fragment = document.createDocumentFragment();
    // ⚡ Bolt Optimization: Use forEach instead of map for side effects (avoids creating unused array)
    cart.forEach(function(el,index)
    {   
        let div = document.createElement("div");
        let div1 = document.createElement("div");

        let image = document.createElement("img");
        image.src = el.imageURL;
        image.loading = "lazy";
        image.decoding = "async";

        let name = document.createElement("p");
        // ⚡ Bolt Optimization: Use textContent instead of innerText for better performance (no layout reflow on write)
        name.textContent = el.name;
        name.className="item-name"; // Use class instead of duplicate ID

        let price = document.createElement("h2");
        price.textContent = `Sale INR ${el.price}`;
        price.style.color="rgb(172,27,37)"
        price.style.marginLeft="30px"


        // Use button for semantics and accessibility
        let remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.className = "remove-btn";
        remove.dataset.index = index;
        // Add aria-label for better accessibility
        remove.setAttribute("aria-label", `Remove ${el.name} from cart`);

        div1.append(name,price,remove);
        div.append(image,div1);
        
        fragment.append(div);
    })
    left.append(fragment);
}
display(cart);
function removeItem(index)
{
    cart.splice(index,1);
    localStorage.setItem("cartItems",JSON.stringify(cart));

    // 🎨 Palette: Calculate focus target before re-render
    // If we remove the last item, focus the previous one.
    // Otherwise focus the item taking the removed item's place (same index).
    const focusIndex = Math.min(index, cart.length - 1);

    display(cart);
    displayTotal();

    // 🎨 Palette: Restore focus to prevent context loss for keyboard users
    if (cart.length > 0) {
        const buttons = document.querySelectorAll('.remove-btn');
        if (buttons[focusIndex]) {
            buttons[focusIndex].focus();
        }
    } else {
        // If cart is empty, focus the "Start Shopping" button
        // Note: display() creates this button with id "check_out" in the empty state
        const shopBtn = document.querySelector("#left #check_out");
        if (shopBtn) {
            shopBtn.focus();
        }
    }
}

function displayTotal()
{   
    if (cart.length === 0) return;

    right.textContent = "";
    // Ensure border is visible if it was hidden
    right.style.border = "solid rgb(218,220,223) 1px";

    var total = 0;
    for(var i =0;i<cart.length;i++)
    {
        total += Number(cart[i].price);
    }

    console.log(total);
    let show = document.createElement("h2");
    // ⚡ Bolt Optimization: Use textContent instead of innerText
    show.textContent = `Your Total: INR ${total}`;
    show.id="showTotal"

    let checkOut = document.createElement("button");
    checkOut.id = "check_out";
    checkOut.textContent = "Check Out";

    
    checkOut.addEventListener("click",function()
    {
        // window.location.href="checkout.html";
        checkout()
    });


    right.append(show,checkOut);
}

var token = (localStorage.getItem("token"));

function checkout(){
    if(token!=null){
        window.location.href="checkout.html";
    }
    else{
        window.location.href="signup.html";
    }
}

displayTotal();
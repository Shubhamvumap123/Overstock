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

// 🎨 Palette: Render a friendly empty state when cart is empty
function renderEmptyState() {
  left.innerHTML = "";
  // Clear the right side (Total section) as it's not needed for empty state
  right.style.display = "none";
  left.style.width = "100%";
  left.style.border = "none";

  const emptyContainer = document.createElement("div");
  // Override inherited #left > div styles (which enforces flex row and 300px height)
  emptyContainer.style.display = "flex";
  emptyContainer.style.flexDirection = "column";
  emptyContainer.style.alignItems = "center";
  emptyContainer.style.justifyContent = "center";
  emptyContainer.style.height = "400px"; // Give it some space
  emptyContainer.style.border = "none";  // Remove the border defined in CSS
  emptyContainer.style.textAlign = "center";
  // emptyContainer.style.marginTop = "50px"; // Flex centering handles this

  const emptyTitle = document.createElement("h2");
  emptyTitle.innerText = "Your Cart is Empty";
  emptyTitle.style.marginBottom = "20px";

  const emptyText = document.createElement("p");
  emptyText.innerText = "Looks like you haven't added anything to your cart yet.";
  emptyText.style.marginBottom = "30px";

  const startShoppingBtn = document.createElement("a");
  startShoppingBtn.href = "index.html";
  startShoppingBtn.innerText = "Start Shopping";
  // Inline styles to match the look and feel without modifying global CSS
  startShoppingBtn.style.display = "inline-block";
  startShoppingBtn.style.backgroundColor = "black";
  startShoppingBtn.style.color = "white";
  startShoppingBtn.style.padding = "15px 30px";
  startShoppingBtn.style.textDecoration = "none";
  startShoppingBtn.style.borderRadius = "5px";
  startShoppingBtn.style.fontWeight = "bold";

  emptyContainer.append(emptyTitle, emptyText, startShoppingBtn);
  left.append(emptyContainer);
}

function display(cart)
{
    left.innerHTML="";

    if (cart.length === 0) {
        renderEmptyState();
        return;
    }

    // Restore layout if cart has items
    right.style.display = "";
    left.style.width = "";
    left.style.border = "";

    // Performance optimization: Use DocumentFragment to batch DOM insertions
    // This reduces reflows from N to 1
    const fragment = document.createDocumentFragment();
    cart.map(function(el,index)
    {   
        let div = document.createElement("div");
        let div1 = document.createElement("div");

        let image = document.createElement("img");
        image.src = el.imageURL;
        image.loading = "lazy";
        image.decoding = "async";

        let name = document.createElement("p");
        name.innerText = el.name;
        name.className="item-name"; // Use class instead of duplicate ID

        let price = document.createElement("h2");
        price.innerText = `Sale INR ${el.price}`;
        price.style.color="rgb(172,27,37)"
        price.style.marginLeft="30px"


        // Use button for semantics and accessibility
        let remove = document.createElement("button");
        remove.innerText="Remove";
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

// Initial display call
display(cart);

function removeItem(index)
{
    cart.splice(index,1);
    localStorage.setItem("cartItems",JSON.stringify(cart));
    display(cart);
    displayTotal();
}

function displayTotal()
{   
    // Only display total if cart has items
    if (cart.length === 0) return;

    right.innerHTML = "";
    var total = 0;
    for(var i =0;i<cart.length;i++)
    {
        total += Number(cart[i].price);
    }

    console.log(total);
    let show = document.createElement("h2");
    show.innerText = `Your Total: INR ${total}`;
    show.id="showTotal"

    let checkOut = document.createElement("button");
    checkOut.id = "check_out";
    checkOut.innerText="Check Out";

    
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

// Initial total display call
displayTotal();

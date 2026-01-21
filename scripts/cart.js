var cart = JSON.parse(localStorage.getItem("cartItems"))||[];
let left = document.getElementById("left");
var right = document.getElementById("right");

function display(cart)
{
    left.innerHTML="";
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
        name.className = "item-name";

        let price = document.createElement("h2");
        price.innerText = `Sale INR ${el.price}`;
        price.style.color="rgb(172,27,37)"
        price.style.marginLeft="30px"


        let remove = document.createElement("button");
        remove.innerText="Remove";
        remove.className = "remove-btn";
        remove.type = "button";
        remove.setAttribute("aria-label", `Remove ${el.name} from cart`);
        remove.addEventListener("click",function()
        {
            removeItem(index);
        })

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
    display(cart);
    displayTotal();
}

function displayTotal()
{   
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

displayTotal();
var cart = JSON.parse(localStorage.getItem("cartItems"))||[];
let left = document.getElementById("left");
var right = document.getElementById("right");

function display(cart)
{
    left.innerHTML="";
    cart.map(function(el,index)
    {   
        let div = document.createElement("div");
        let div1 = document.createElement("div");

        let image = document.createElement("img");
        image.src = el.imageURL;

        let name = document.createElement("p");
        name.innerText = el.name;

        let price = document.createElement("h2");
        price.innerText = `Sale INR ${el.price}`;
        price.style.color="rgb(172,27,37)"

        let remove = document.createElement("u");
        remove.innerText="Remove";
        remove.id = "remove";
        remove.addEventListener("click",function()
        {
            removeItem(index);
        })

        div1.append(name,price,remove);
        div.append(image,div1);
        
        left.append(div);
        console.log(el);
    })
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

    let checkOut = document.createElement("button");
    checkOut.id = "check_out";
    checkOut.innerText="Check Out";
    checkOut.addEventListener("click",function()
    {
        window.location.href="checkout.html";
    });


    right.append(show,checkOut);
}

displayTotal();
async function apiCall(url) {

    //add api call logic here
    try
    {
        let res = await fetch(url);
        let data = await res.json();
        //console.log(data);
        return data;
    }
    catch(err)
    {
        console.log("err: ",err);
    }
}

function appendArticles(articles, main) 
{
  
            console.log(articles);
            let image_div = document.createElement("div");
            let desc_div = document.createElement("div");
            desc_div.id="desc_div";

            let image = document.createElement("img");
            image.src = articles.imageURL;

            let h3 = document.createElement("h3");
            h3.innerText = articles.name;

            let star = document.createElement("p");
            let grey = document.createElement("span");

            let rating = Math.round(articles.rating);
            if(rating==1)
            {
                star.innerText = "★";
                grey.innerText = "★★★★";
            }
            else if(rating==2)
            {
                star.innerText = "★★";
                grey.innerText = "★★★";
            }
            else if(rating==3)
            {
                star.innerText = "★★★";
                grey.innerText = "★★";
            }
            else if(rating==4)
            {
                star.innerText = "★★★★";
                grey.innerText = "★";
            }
            else
            {
                star.innerText = "★★★★★";
            }
            star.id = "star";
            grey.id = "grey";

            let cost = document.createElement("h3");
            cost.innerText = `Sale INR ${articles.price}/-`;
            cost.style.color = "#b22";
            cost.id = "cost";

            let choose = document.createElement("p");
            choose.innerText = `Color(${articles.color.length}):  Choose Color`;

            let choice = document.createElement("div");
            choice.id = "choice";

            let img1 = document.createElement("img");
            let img2 = document.createElement("img");
            let img3 = document.createElement("img");
            let img4 = document.createElement("img");

            img1.src = articles.img1;
            img2.src = articles.img2;
            img3.src = articles.img3;
            img4.src = articles.img4;

            let cart_div = document.createElement("div");

            let select = document.createElement("select");
            let option = document.createElement("option");
            let option2 = document.createElement("option");
            let option3 = document.createElement("option");

            option.innerText = "Quantity: 1";
            option2.innerText = "Quantity: 2";
            option3.innerText = "Quantity: 3";

            let addCart_btn = document.createElement("button");
            addCart_btn.id = "addCart_btn";
            addCart_btn.textContent="Add to Cart";
            addCart_btn.addEventListener("click",function()
            {
                addToCart(articles);
            })

            select.append(option,option2,option3);

            cart_div.append(select,addCart_btn);

            choice.append(img1,img2,img3,img4);

            star.append(grey);
            desc_div.append(h3,star,cost,choose,choice,cart_div);
            image_div.append(image);
            main.append(image_div,desc_div);

}

var cart = JSON.parse(localStorage.getItem("cartItems"))||[];
    function addToCart(data)
    {
        cart.push(data);
        localStorage.setItem("cartItems",JSON.stringify(cart));
        window.location.href = "cart.html";
    }

export { apiCall, appendArticles }
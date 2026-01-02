import {getData, appendData,appendD} from "/scripts/main.js"

let category = JSON.parse(localStorage.getItem("category")) || []
let parent = document.getElementById("main")
if (parent) appendData(category, parent)

let trend = JSON.parse(localStorage.getItem("trending")) || []
let trending = document.getElementById("main1")
if (trending) appendData(trend, trending)

let ourSty = JSON.parse(localStorage.getItem("ourstyle")) || []
let parent1 = document.getElementById("main2")
if (parent1) appendData(ourSty,parent1)

// ⚡ Bolt Optimization: Removed blocking top-level await on dead API.
// "https://overstockapi.herokuapp.com/products/" is 404ing and blocking the main thread.
// Initializing res to empty array to prevent blocking.
let res = []

let cont = document.getElementById("prod-list")
let sortElement = document.getElementById("priceSort");

if (sortElement) {
    sortElement.addEventListener("click", handler)
}

function handler() {
    let selected = document.getElementById("priceSort").value
    if(selected=="high"){
        res.sort(function (a,b){
            return b.price-a.price;
        })
        appendD(res,cont)
    }
    else if(selected=="low"){
        res.sort(function (a,b){
            return a.price-b.price
        })
        appendD(res,cont)
    }
    else if(selected=="s"){
        res.sort(function (a,b){
            return b.rating-a.rating;
        })
        appendD(res,cont)
    }
}

if (cont) appendD(res,cont)

// ⚡ Bolt Optimization: Replaced 15 repetitive event listeners with a single loop.
// Fixed bug where buttons 9-14 opened the wrong dropdown (myDropdown3).
document.querySelectorAll('.dropbtn').forEach(btn => {
    btn.addEventListener('click', (event) => {
        const content = btn.nextElementSibling;
        if (content) {
            content.classList.toggle("show");
        }
    });
});

// ⚡ Bolt Optimization: Optimized global click handler to close dropdowns.
// Replaced 15 separate checks with a generic selector.
window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
        const dropdowns = document.querySelectorAll('[class*="dropdown-content"]');
        dropdowns.forEach(openDropdown => {
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        });
    }
};

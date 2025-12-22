import {getData, appendData,appendD} from "/scripts/main.js"
import { categoryData, trendingData, styleData } from "/components/data.js";

let category = categoryData;
let parent = document.getElementById("main")
appendData(category, parent)
let trend = trendingData;


let trending = document.getElementById("main1")

appendData(trend, trending)

let ourSty = styleData;
let parent1 = document.getElementById("main2")
appendData(ourSty,parent1)
//https://overstockapi.herokuapp.com/products/mainCategory=${selected_cat}

let res = await getData("https://overstockapi.herokuapp.com/products/")



let cont = document.getElementById("prod-list")

let sort = document.getElementById("priceSort").addEventListener("click", handler)

function handler() {
    let selected = document.getElementById("priceSort").value
    if(selected=="high"){
        res.sort(function (a,b){
            //console.log("High")
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
            //console.log("High")
            return b.rating-a.rating;
             
        })
        appendD(res,cont)
    }
    
    
}


appendD(res,cont)

let btn = document.getElementById("myFunction").addEventListener("click",myFunction)
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  let btn1 = document.getElementById("myFunction1").addEventListener("click",myFunction1)
  function myFunction1() {
    document.getElementById("myDropdown1").classList.toggle("show");
  }
  let btn2 = document.getElementById("myFunction2").addEventListener("click",myFunction2)
  function myFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show");
  }
  let btn3 = document.getElementById("myFunction3").addEventListener("click",myFunction3)
  function myFunction3() {
    document.getElementById("myDropdown3").classList.toggle("show");
  }
  let btn4 = document.getElementById("myFunction4").addEventListener("click",myFunction4)
  function myFunction4() {
    document.getElementById("myDropdown4").classList.toggle("show");
  }
  let btn5 = document.getElementById("myFunction5").addEventListener("click",myFunction5)
  function myFunction5() {
    document.getElementById("myDropdown5").classList.toggle("show");
  }
  let btn6 = document.getElementById("myFunction6").addEventListener("click",myFunction6)
  function myFunction6() {
    document.getElementById("myDropdown6").classList.toggle("show");
  }
  let btn7 = document.getElementById("myFunction7").addEventListener("click",myFunction7)
  function myFunction7() {
    document.getElementById("myDropdown7").classList.toggle("show");
  }
  let btn8 = document.getElementById("myFunction8").addEventListener("click",myFunction8)
  function myFunction8() {
    document.getElementById("myDropdown8").classList.toggle("show");
  }
  let btn9 = document.getElementById("myFunction9").addEventListener("click",myFunction3)
  function myFunction9() {
    document.getElementById("myDropdown9").classList.toggle("show");
  }
  let btn10 = document.getElementById("myFunction10").addEventListener("click",myFunction3)
  function myFunction10() {
    document.getElementById("myDropdown10").classList.toggle("show");
  }
  let btn11 = document.getElementById("myFunction11").addEventListener("click",myFunction3)
  function myFunction11() {
    document.getElementById("myDropdown11").classList.toggle("show");
  }
  let btn12 = document.getElementById("myFunction12").addEventListener("click",myFunction3)
  function myFunction12() {
    document.getElementById("myDropdown12").classList.toggle("show");
  }
  let btn13 = document.getElementById("myFunction13").addEventListener("click",myFunction3)
  function myFunction13() {
    document.getElementById("myDropdown13").classList.toggle("show");
  }
  let btn14 = document.getElementById("myFunction14").addEventListener("click",myFunction3)
  function myFunction14() {
    document.getElementById("myDropdown14").classList.toggle("show");
  }

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content1");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content2");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content3");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content4");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content5");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content6");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content7");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }

    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content8");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content9");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content10");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content11");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content12");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content13");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content14");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
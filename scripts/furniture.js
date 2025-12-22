import {appendData,getData} from "/scripts/main.js"
import { furnitureData, moreCategory } from "/components/data.js";

var data = furnitureData;
var data1 = moreCategory;
  

    let res = await getData("https://overstockapi.herokuapp.com/page")
   
    function append(res){
        res.forEach(function(e){

            let div = document.createElement('div')

            let image = document.createElement('img');
            image.src = e.catergory.imgUrl;

            div.append(image)
            document.querySelector("#category").append(div)
        })
    }


    let parent = document.getElementById('main')
    let parent1 = document.getElementById('main1')
    appendData(data,parent)
    appendData(data1,parent1)

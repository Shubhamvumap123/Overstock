import {appendData,getData} from "/scripts/main.js"

var data = JSON.parse(localStorage.getItem('furniture_data'))

    var data1 = JSON.parse(localStorage.getItem('moreCategory'))

  

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
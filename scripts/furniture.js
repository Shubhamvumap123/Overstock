import {appendData} from "/scripts/main.js"

var data = JSON.parse(localStorage.getItem('furniture_data'))

    var data1 = JSON.parse(localStorage.getItem('moreCategory'))

    let parent = document.getElementById('main')
    let parent1 = document.getElementById('main1')
    appendData(data,parent)
    appendData(data1,parent1)

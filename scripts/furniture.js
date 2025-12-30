import {appendData} from "/scripts/main.js"

// ⚡ Bolt Optimization: Removed blocking API call and dead code.
// The previous await getData(...) blocked the rendering of localStorage content.
// The fetched data was also never used.

var data = JSON.parse(localStorage.getItem('furniture_data'))
var data1 = JSON.parse(localStorage.getItem('moreCategory'))

let parent = document.getElementById('main')
let parent1 = document.getElementById('main1')
appendData(data,parent)
appendData(data1,parent1)

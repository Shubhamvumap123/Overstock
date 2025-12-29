import {appendData} from "/scripts/main.js"

// ⚡ Bolt Optimization: Removed blocking API call and dead code.
// The data is loaded from localStorage (seeded by components/data.js).
// Previous implementation awaited a network request that was never used, delaying rendering.

var data = JSON.parse(localStorage.getItem('furniture_data'))
var data1 = JSON.parse(localStorage.getItem('moreCategory'))

let parent = document.getElementById('main')
let parent1 = document.getElementById('main1')

// Add safety checks
if (parent && data) {
    appendData(data,parent)
}
if (parent1 && data1) {
    appendData(data1,parent1)
}

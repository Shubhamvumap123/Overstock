
// ⚡ Bolt Optimization: Removed unused `getData` function to reduce bundle size.
// Previous code:
// async function getData(url){
//    try{
//    let res = await fetch(url);
//    let data = await res.json();
//    console.log(data)
//    return data
// }
// catch(err){
//    console.log(err)
// }
// }

function appendData(data,parent){
    let fragment = document.createDocumentFragment();
    data.forEach((e)=>{
       
        let rat =(Math.random()*5).toFixed(1);
        // ⚡ Bolt Optimization: Changed div to a for semantic navigation and removed per-element event listener
        let div = document.createElement('a');
        div.className = "div1";
        div.href = "livingRoom.html";
        div.style.display = "block";
        div.style.textDecoration = "none";
        div.style.color = "inherit";

        let image = document.createElement('img');
        image.src = e.imgUrl
        image.loading = "lazy";
        image.decoding = "async";
        image.id = "poster";
        image.loading = "lazy";
        image.decoding = "async";

        let rating = document.createElement('p')
        rating.className='rating';
        // ⚡ Bolt Optimization: Use textContent with Unicode stars instead of innerHTML
        if(rat>0 && rat<=1.4){
        rating.textContent = `${rat} ⭐ `;
         }
         else if(rat>=1.5 && rat <2.4){
            rating.textContent = `${rat} ⭐ ⭐ `;
         }
         else if(rat>=2.5 && rat <=3.4){
            rating.textContent = `${rat} ⭐ ⭐ ⭐`;
         }
         else if(rat>=3.5 && rat <=4.4){
            rating.textContent = `${rat} ⭐  ⭐ ⭐ ⭐ `;
         }
         else if(rat>=4.5){
            rating.textContent = `${rat} ⭐  ⭐ ⭐ ⭐ ⭐`;
         }
        let name = document.createElement('p')
        name.innerText = e.name
        name.className = "txtSmall"

        //div.append(image,name)
        // Corrected to append rating as well
        div.append(image,name,rating)
        // ⚡ Bolt Optimization: Removed O(N) event listener attachment
        fragment.append(div)
    })
    parent.append(fragment);
}

function appendD(res,cont){ 
    cont.innerHTML=" ";
    let fragment = document.createDocumentFragment();
   res.forEach(ele => {

       let rev = Math.round(Math.random()*200)+10
       
    
       let div = document.createElement("div")
       div.className="box"
       // ⚡ Bolt Optimization: Added data-id for event delegation
       div.dataset.id = ele._id

       let image = document.createElement("img")
       image.src = ele.imageURL;
       image.loading = "lazy";
       image.decoding = "async";
       image.id = "poster";
       image.loading = "lazy";
       image.decoding = "async";
       
       let name = document.createElement("p")
       name.className = "name"
       name.innerText = ele.name
       
       let price = document.createElement("p")
       price.className = "price"
       price.innerText = `Sale Starts at INR ${ele.price}`;

       let rating = document.createElement("p")
       rating.className="rating"
       // ⚡ Bolt Optimization: Use textContent with Unicode stars instead of innerHTML
       if(ele.rating>0 && ele.rating<=1.4){
       rating.textContent = `${ele.rating} ⭐ `;
        }
        else if(ele.rating>=1.5 && ele.rating <2.4){
           rating.textContent = `${ele.rating} ⭐ ⭐ `;
        }
        else if(ele.rating>=2.5 && ele.rating <=3.4){
           rating.textContent = `${ele.rating} ⭐ ⭐ ⭐`;
        }
        else if(ele.rating>=3.5 && ele.rating <=4.4){
           rating.textContent = `${ele.rating} ⭐⭐ ⭐ ⭐ (${rev})`;
        }
        else if(ele.rating>=4.5){
           rating.textContent = `${ele.rating} ⭐  ⭐ ⭐ ⭐ ⭐ (${rev})`;
        }
      // ⚡ Bolt Optimization: Removed O(N) event listener attachment
       div.append(image,price,rating,name)
       fragment.append(div)
   
   });
   cont.append(fragment);
}

// ⚡ Bolt Optimization: Removed unused getData export
export {appendData,appendD}

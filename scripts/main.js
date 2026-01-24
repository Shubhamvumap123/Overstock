
async function getData(url){
    try{
    let res = await fetch(url);
    let data = await res.json();
    console.log(data)

   return data
}
catch(err){
    console.log(err)
}
}

function appendData(data,parent){
    let fragment = document.createDocumentFragment();
    data.forEach((e)=>{
       
        let rat =(Math.random()*5).toFixed(1);
        // ⚡ Bolt Optimization: Use semantic <a> tag instead of div with onclick
        let div = document.createElement('a');
        div.className = "div1";
        div.href = "livingRoom.html";
        div.style.textDecoration = "none";
        div.style.color = "inherit";
        div.style.display = "block"; // Ensure block layout behavior matching original div
        div.style.margin = "0"; // Reset margin to avoid inheriting global <a> styles (e.g. in furniture.css)

        let image = document.createElement('img');
        image.src = e.imgUrl
        image.loading = "lazy";
        image.decoding = "async";
        // ⚡ Bolt Optimization: Use class instead of duplicate ID
        image.className = "poster";

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
        // div.onclick removed
        fragment.append(div)
    })
    parent.append(fragment);
}

function appendD(res,cont){ 
    cont.innerHTML=" ";
    let fragment = document.createDocumentFragment();
   res.forEach(ele => {

       let rev = Math.round(Math.random()*200)+10
       
       // ⚡ Bolt Optimization: Use semantic <a> tag for deep linking and accessibility
       let div = document.createElement("a")
       div.className="box"
       div.href = `productPage.html?id=${ele._id}`;
       div.style.textDecoration = "none";
       div.style.color = "inherit";
       div.style.display = "block"; // Ensure block layout behavior matching original div
       div.style.margin = "0"; // Reset margin to avoid inheriting global <a> styles

       let image = document.createElement("img")
       image.src = ele.imageURL;
       image.loading = "lazy";
       image.decoding = "async";
       // ⚡ Bolt Optimization: Use class instead of duplicate ID
       image.className = "poster";
       
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

       // div.onclick removed
       // Optional: Add event listener to still set localStorage if needed for legacy reasons
       div.addEventListener('click', () => {
           localStorage.setItem("selected_id", JSON.stringify(ele._id));
       });

       div.append(image,price,rating,name)
       fragment.append(div)
   
   });
   cont.append(fragment);
}

export {getData, appendData,appendD}

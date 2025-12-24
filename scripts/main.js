
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
        let div = document.createElement('div');
        div.id = "div1";

        let image = document.createElement('img');
        image.src = e.imgUrl
        image.id = "poster";

        let rating = document.createElement('p')
        rating.id='rating';
        if(rat>0 && rat<=1.4){
        rating.innerHTML = `${rat} &#11088 `;
         }
         else if(rat>=1.5 && rat <2.4){
            rating.innerHTML = `${rat} &#11088 &#11088 `;
         }
         else if(rat>=2.5 && rat <=3.4){
            rating.innerHTML = `${rat} &#11088 &#11088 &#11088`;
         }
         else if(rat>=3.5 && rat <=4.4){
            rating.innerHTML = `${rat} &#11088  &#11088 &#11088 &#11088 `;
         }
         else if(rat>=4.5){
            rating.innerHTML = `${rat} &#11088  &#11088 &#11088 &#11088 &#11088`;
         }
        let name = document.createElement('p')
        name.innerText = e.name
        name.className = "txtSmall"

        div.append(image,name)
       //div.append(image,name,rating)
        div.onclick= ()=>{
            window.location.href="livingRoom.html"
        }
        fragment.append(div)
    })
    parent.append(fragment);
}

function appendD(res,cont){ 
    cont.innerHTML=" ";
    let fragment = document.createDocumentFragment();
   res.forEach(ele => {
      console.log("Done")
       let rev = Math.round(Math.random()*200)+10
       
    
       let div = document.createElement("div")
       div.id="box"

       let image = document.createElement("img")
       image.src = ele.imageURL;
       image.id = "poster";
       
       let name = document.createElement("p")
       name.className = "name"
       name.innerText = ele.name
       
       let price = document.createElement("p")
       price.className = "price"
       price.innerText = `Sale Starts at INR ${ele.price}`;

       let rating = document.createElement("p")
       rating.className="rating"
       if(ele.rating>0 && ele.rating<=1.4){
       rating.innerHTML = `${ele.rating} &#11088 `;
        }
        else if(ele.rating>=1.5 && ele.rating <2.4){
           rating.innerHTML = `${ele.rating} &#11088 &#11088 `;
        }
        else if(ele.rating>=2.5 && ele.rating <=3.4){
           rating.innerHTML = `${ele.rating} &#11088 &#11088 &#11088`;
        }
        else if(ele.rating>=3.5 && ele.rating <=4.4){
           rating.innerHTML = `${ele.rating} &#11088&#11088 &#11088 &#11088 (${rev})`;
        }
        else if(ele.rating>=4.5){
           rating.innerHTML = `${ele.rating} &#11088  &#11088 &#11088 &#11088 &#11088 (${rev})`;
        }
      div.onclick=()=>{
          localStorage.setItem("selected_id",JSON.stringify(ele._id));
          window.location.href="productPage.html"
      }
       div.append(image,price,rating,name)
       fragment.append(div)
   
   });
   cont.append(fragment);
}

export {getData, appendData,appendD}

  
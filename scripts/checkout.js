
document.querySelector(".button").addEventListener("click",function(){
console.log("123")
 alert("Order Placed Succesfully")
window.location.href='index.html'
})

 let checkAddress = ()=>{
     
 let checkValue = "true";
     billingAddressData = {

        email: document.getElementById("email").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        company: document.getElementById("company").value,
        taxId: document.getElementById("taxId").value,
        address1: document.getElementById("address1").value,
        address2: document.getElementById("address2").value,
        country: document.getElementById("country").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        zipcode: document.getElementById("zipcode").value,
        phone: document.getElementById("phone").value,
     }

     for (key in billingAddressData){
         if (billingAddressData[key] == ""){
             if (key == "email" || key == "firstName" || key == "lastName" || key == "address1" ||
                  key == "country" || key == "city" || key == "phone"){
                      alert(`${key} is Required`);
                      checkValue = "false"
                      break;
                  }
            }
     }
     if (checkValue != "false"){
        checkAddress2();

     }

 }


 let checkAddress2 = () => {
    let checkValue2 = "true";
    billingAddressData = {

        email: document.getElementById("email2").value,
        firstName: document.getElementById("firstName2").value,
        lastName: document.getElementById("lastName2").value,
        company: document.getElementById("company2").value,
        taxId: document.getElementById("taxId2").value,
        address1: document.getElementById("address12").value,
        address2: document.getElementById("shipping_address22").value,
        country: document.getElementById("country2").value,
        city: document.getElementById("city2").value,
        state: document.getElementById("state2").value,
        zipcode: document.getElementById("zipcode2").value,
        phone: document.getElementById("phone2").value,
     }

     for (key in billingAddressData){
         if (billingAddressData[key] == ""){
             if (key == "email" || key == "firstName" || key == "lastName" || key == "address1" ||
                  key == "country" || key == "city" || key == "phone"){
                      alert(`${key} is Required`);
                      checkValue2 = "false"
                    return;
                  }
            }
     }
     if (checkValue2 != "false"){
        checkPaymentDetails();
     }
 }

 
 let checkPaymentDetails = () => {
    let checkValue3 = "true";

     let paymentDetails = {
            card_type: document.getElementById("card_type").value,
            name: document.getElementById("name").value,
            exp_date: document.getElementById("exp_date").value,
            cvv: document.getElementById("cvv").value,
     }

     for (key in paymentDetails){
         console.log(1)
         if (paymentDetails[key] == ""){
             alert (`${key} is required for Payment`);
             checkValue3 = "false";
             console.log(1)
             return;
         }
     }
     console.log(1)
     if (checkValue3 != "false"){
         console.log(1)
         if (paymentDetails.name == "abhi" && paymentDetails.cvv == 123){
           
            localStorage.clear();
            
            window.location.href = "index.html"
         } else {
             
         }
     }
 }


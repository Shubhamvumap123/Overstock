
document.addEventListener("DOMContentLoaded", function() {
    let submitBtn = document.querySelector(".button");
    if (submitBtn) {
        submitBtn.addEventListener("click", function(e) {
            e.preventDefault();
            checkAddress();
        });
    }
});

let billingAddressData = {};

let checkAddress = () => {
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

    for (let key in billingAddressData) {
        if (billingAddressData[key] == "") {
            if (key == "email" || key == "firstName" || key == "lastName" || key == "address1" ||
                key == "country" || key == "city" || key == "phone") {
                alert(`${key} is Required`);
                checkValue = "false"
                break;
            }
        }
    }
    if (checkValue != "false") {
        checkAddress2();
    }
}

let checkAddress2 = () => {
    let checkValue2 = "true";
    let shippingAddressData = {
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

    for (let key in shippingAddressData) {
        if (shippingAddressData[key] == "") {
            // Shipping address is optional? The original code checked specific fields if they were present in the object
            // But here the object has keys.
            // Original code: if (key == "email" ...)
            // However, typically billing is required, shipping is optional or same as billing.
            // But the form has input fields.
            // Let's keep the original logic: only required fields check.
            if (key == "email" || key == "firstName" || key == "lastName" || key == "address1" ||
                key == "country" || key == "city" || key == "phone") {
                // Wait, if it's empty, and it is a required key, alert.
                // But are shipping fields required? The original code seemed to think so.
                // But often shipping address is not filled if same as billing.
                // The original code was:
                /*
                 if (billingAddressData[key] == ""){ ... }
                */
                // Wait, original code accessed `billingAddressData` inside `checkAddress2`!
                // Copy paste error in original code?
                // `billingAddressData = { ... elements with 2 ... }`
                // Yes, it reassigned `billingAddressData`.

                alert(`${key} is Required`);
                checkValue2 = "false"
                return;
            }
        }
    }
    if (checkValue2 != "false") {
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

    for (let key in paymentDetails) {
        if (paymentDetails[key] == "") {
            alert(`${key} is required for Payment`);
            checkValue3 = "false";
            return;
        }
    }

    if (checkValue3 != "false") {
        // Removed hardcoded check for "abhi" and "123"
        localStorage.clear(); // Clear cart
        alert("Order Placed Successfully");
        window.location.href = "orderPlaced.html";
    }
}

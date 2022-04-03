
let errorMessage = (err) => {
  const errorDiv = document.querySelector("#errorMessage");
  errorDiv.style.display = "block";
  const error = document.createElement("p");
  error.textContent = err;

};

const signUpBtn = document.querySelector(".signUp button");
signUpBtn.addEventListener("click", async (e) => {
  const checkbox = document.getElementById("checkbox").checked;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (
    email === "" 
  
  ) {
    alert("Please enter a valid email ");
    return;
  }else if (
    
    password === "" ||
    confirmPassword === "" 
  ) {
    alert("Please enter a valid password");
    return;
  }
  else if(!isEmail(email)){

    e.preventDefault();

    errorMessage(
      alert("Email is not Valid")
    );
    return;
  }
  else if (password != confirmPassword) {
    e.preventDefault();
    
      alert("The passwords you have entered do not match. Please try again.")

      alert("Password must contain at least 1 Uppercase , 1 lowercase , 1 number and 1 special Character.")
    return;
  } else if (password.length < 8 && password.length != 0) {
    e.preventDefault();
    errorMessage(
      alert("Password must be a minimum of 8 characters and cannot exceed 70 characters")
    );
    errorMessage(
      alert("Password must contain at least 1 Uppercase , 1 lowercase , 1 number and 1 special Character.")
    );
    return;
  }else if(checkbox==false){
    alert("please select checkbox");
    return;
  }

  let passResult = {};
  for (let i = 0; i < password.length; i++) {
    if (password.charCodeAt(i) > 64 && password.charCodeAt(i) < 90) {
      passResult[0] = "yes1";
    } else if (password.charCodeAt(i) > 96 && password.charCodeAt(i) < 123) {
      passResult[1] = "yes2";
    } else if (password.charCodeAt(i) > 47 && password.charCodeAt(i) < 58) {
      passResult[2] = "yes3";
    } else if (
      (password.charCodeAt(i) > 57 && password.charCodeAt(i) < 65) ||
      (password.charCodeAt(i) > 32 && password.charCodeAt(i) < 48)
    ) {
      passResult[3] = "yes4";
    }
  }
  if (Object.keys(passResult).length != 4) {
    e.preventDefault();
    errorMessage(
     alert ("Password must be a minimum of 8 characters and cannot exceed 70 characters")
    );
    alert("Password must contain at least 1 Uppercase , 1 lowercase , 1 number and 1 special Character.");
    return;
  }

  e.preventDefault();


  let userName = "";


  for (let i = 0; i < email.length; i++) {
    if (email[i] != "@") {
      userName += email[i];
    } else {
      break;
    }
  }


  function random(number) {
    return Math.floor(Math.random() * number);
  }

  let signup_data = {
  
    email: email,
    password: password,
   
  };
  signup_data = JSON.stringify(signup_data);
  console.log(signup_data);

  let register_api = ` https://overstock-dubli.herokuapp.com/register`;

  var response = await fetch(register_api, {
    method: "POST",
    body: signup_data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await response.json();
  console.log("data: ", data);
  if (data.token) {
    alert("create account succesfuly")
   
    // errorMessage(data.message);
  } else {
    alert("user already exist")
    // errorMessage(data.message);
  }
});

const signInBtn = document.querySelector(".signIn button");
signInBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {

    let login_data = {
       email : document.getElementById("inputEmail").value,
       password : document.getElementById("inputPassword").value,
    }
    let login_data_json = JSON.stringify(login_data)
    let res = await fetch("https://overstock-dubli.herokuapp.com/login",{

 method: "POST",
 body: login_data_json,
 headers: {
   "Content-Type" : "application/json",
 }

    })
    let data = await res.json();
    console.log(data)
    if(data.token){
      localStorage.setItem("token", data.token)
      window.location.href = "cart.html"
    }else{
      alert("email or password incorrect")
    }
   
  } catch (error) {
    return console.log({error: error.message});
  }
 
  e.preventDefault();

  let userName = "";
  for (let i = 0; i < email.length; i++) {
    if (email[i] != "@") {
      userName += email[i];
    } else {
      break;
    }
  }

  let login_data = {
    email:email,
    password: password,
  };

  login_data_json = JSON.stringify(login_data);
  
  let login_api = `http://localhost:4000/auth/google/`;

  let response = await fetch('localhost:4000/auth/google/', {
    method: "POST",
    body: login_data_json,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  let data = await response.json();
  console.log("data: ", data);
  if (data.error === true) {
    errorMessage(data.message);
  } else {
    getProfile(userName, data.token);
    window.location.href = "index.html"
  }

  async function getProfile(username, token) {
    let api = `http://localhost:4000/auth/google/${username}`;
    let response = await fetch(api, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    console.log("data: ", data);
  }
 });
var guest = document.querySelector(".guest button");
guest.addEventListener("click", () => {
  
   alert ("successfuly login with google")
  
  window.location.href = "http://localhost:4000/auth/google"
  
  console.log("success")
});


function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[`0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
  }


let errorMessage = (err) => {
  const errorDiv = document.querySelector("#errorMessage");
  errorDiv.style.display = "block";
  const error = document.createElement("p");
  error.textContent = err;
  errorDiv.append(error);
  
  let state = setTimeout(function () {
    errorDiv.innerHTML = "";
    errorDiv.style.display = "none";
  }, 5000);
};

const signUpBtn = document.querySelector(".signUp button");
signUpBtn.addEventListener("click", async (e) => {
  const checkbox = document.getElementById("checkbox").checked;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  if (
    email === "" ||
    password === "" ||
    confirmPassword === "" ||
    checkbox === false
  ) {
    return;
  } else if(!isEmail(email)){
    e.preventDefault();
    errorMessage(
      alert("Email is not Valid")
    );
    return;
  }
  else if (password != confirmPassword) {
    e.preventDefault();
    errorMessage(
      alert("The passwords you have entered do not match. Please try again.")
    );
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
    name: "Null",
    email: email,
    password: password,
    username: userName,
    mobile: String(random(10000000000)),
    description: "Null",
  };
  signup_data = JSON.stringify(signup_data);
  console.log(signup_data);

  let register_api = `https://masai-api-mocker.herokuapp.com/auth/register`;

  var response = await fetch(register_api, {
    method: "POST",
    body: signup_data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await response.json();
  console.log("data: ", data);
  if (data.error == false) {
    alert("create account succesfuly")
   
    errorMessage(data.message);
  } else {
    alert("user already exist")
    errorMessage(data.message);
  }
});


const signInBtn = document.querySelector(".signIn button");
signInBtn.addEventListener("click", async (e) => {
  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;
  if (email === "" || password === "") {
    return;
  }
  else if(!isEmail(email)){
    e.preventDefault();
    errorMessage(
     alert("Email is not valid")
    );
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

  let login_data = {
    username: userName,
    password: password,
  };

  login_data = JSON.stringify(login_data);

  let login_api = `https://masai-api-mocker.herokuapp.com/auth/login`;



  let response = await fetch(login_api, {
    method: "POST",
    body: login_data,
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
    alert("login Successful")
    window.location.href = "index.html"
  }

  async function getProfile(username, token) {
    let api = `https://masai-api-mocker.herokuapp.com/user/${username}`;
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
  alert ("successfuly login as a guest")
  window.location.href = "index.html";
});

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[`0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

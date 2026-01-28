
let errorMessage = (err) => {
  const errorDiv = document.querySelector("#errorMessage");
  errorDiv.style.display = "block";
  errorDiv.innerHTML = ""; // Clear previous errors
  const error = document.createElement("p");
  error.textContent = err;
  errorDiv.appendChild(error);
};

// Helper function to toggle button loading state
function toggleLoading(button, isLoading, loadingText = "Please wait...") {
  if (isLoading) {
    if (!button.dataset.originalText) {
      button.dataset.originalText = button.textContent;
    }
    button.disabled = true;
    button.textContent = loadingText;
  } else {
    button.disabled = false;
    button.textContent = button.dataset.originalText || button.textContent;
  }
}

const signUpBtn = document.querySelector(".signUp button");
signUpBtn.addEventListener("click", async (e) => {
  const checkbox = document.getElementById("checkbox").checked;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (email === "") {
    errorMessage("Please enter a valid email ");
    e.preventDefault();
    return;
  } else if (password === "" || confirmPassword === "") {
    errorMessage("Please enter a valid password");
    e.preventDefault();
    return;
  } else if (!isEmail(email)) {
    e.preventDefault();
    errorMessage("Email is not Valid");
    return;
  } else if (password != confirmPassword) {
    e.preventDefault();
    errorMessage("The passwords you have entered do not match. Please try again.")
    return;
  } else if (password.length < 8 && password.length != 0) {
    e.preventDefault();
    errorMessage("Password must be a minimum of 8 characters and cannot exceed 70 characters");
    return;
  } else if (checkbox == false) {
    errorMessage("please select checkbox");
    e.preventDefault();
    return;
  }

  // ⚡ Bolt Optimization: Replaced manual loop with Regex for better performance and readability
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  // Using \W or _ to match special characters, which covers the previous manual range and more
  const hasSpecial = /[\W_]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecial) {
    e.preventDefault();
    errorMessage("Password must contain at least 1 Uppercase , 1 lowercase , 1 number and 1 special Character.");
    return;
  }

  // Clear previous error messages if validation passes
  document.querySelector("#errorMessage").style.display = "none";

  e.preventDefault();
  toggleLoading(signUpBtn, true, "Creating Account...");

  try {
    let userName = "";

    for (let i = 0; i < email.length; i++) {
      if (email[i] != "@") {
        userName += email[i];
      } else {
        break;
      }
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
      errorMessage("Account created successfully");
    } else {
      errorMessage("User already exists");
    }
  } catch (error) {
    console.error(error);
    errorMessage("Something went wrong. Please try again.");
  } finally {
    toggleLoading(signUpBtn, false);
  }
});

const signInBtn = document.querySelector(".signIn button");
signInBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  toggleLoading(signInBtn, true, "Signing In...");
  try {

    let login_data = {
      email: document.getElementById("inputEmail").value,
      password: document.getElementById("inputPassword").value,
    }
    let login_data_json = JSON.stringify(login_data)
    let res = await fetch("https://overstock-dubli.herokuapp.com/login", {

      method: "POST",
      body: login_data_json,
      headers: {
        "Content-Type": "application/json",
      },

    })
    let data = await res.json();
    console.log(data)
    if (data.token) {
      localStorage.setItem("token", data.token)
      window.location.href = "cart.html"
    } else {
      errorMessage("email or password incorrect");
    }

  } catch (error) {
    // The previous code had unreachable code after this catch block that tried Google Auth.
    // I am retaining the structure but ensuring safety.
    console.log({ error: error.message });
    errorMessage("Login failed. Please try again.");
  } finally {
    toggleLoading(signInBtn, false);
  }
});

var guest = document.querySelector(".guest button");
guest.addEventListener("click", () => {
  window.location.href = "cart.html";
  console.log("success");
});


function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[`0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

// 🎨 Palette: Password Visibility Toggle Logic
document.querySelectorAll('.password-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const input = button.previousElementSibling;
    if (input && input.tagName === 'INPUT') {
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);

      // Update ARIA label
      button.setAttribute('aria-label', type === 'password' ? 'Show password' : 'Hide password');

      // Update Icon
      if (type === 'password') {
        // Show Eye Icon (Open)
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`;
      } else {
        // Show Eye Slash Icon (Closed)
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>`;
      }
    }
  });
});

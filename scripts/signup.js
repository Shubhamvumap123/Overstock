
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

// Palette: Password Visibility Toggle
document.querySelectorAll('.password-toggle').forEach(button => {
  button.addEventListener('click', () => {
    // Find the input within the same wrapper
    const wrapper = button.closest('.password-wrapper');
    const input = wrapper.querySelector('input');
    const eyeIcon = button.querySelector('.eye-icon');
    const eyeOffIcon = button.querySelector('.eye-off-icon');

    if (input.type === 'password') {
      input.type = 'text';
      button.setAttribute('aria-label', 'Hide password');
      eyeIcon.style.display = 'none';
      eyeOffIcon.style.display = 'block';
    } else {
      input.type = 'password';
      button.setAttribute('aria-label', 'Show password');
      eyeIcon.style.display = 'block';
      eyeOffIcon.style.display = 'none';
    }
  });
});

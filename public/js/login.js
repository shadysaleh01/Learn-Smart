$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form#form");
  const emailInput = $("input#email");
  const passwordInput = $("input#password");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        localStorage.setItem("userEmail", email)
        localStorage.setItem("isAuthenticated", true)
        window.location.replace("/play.html");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }

});

function validateUser() {
  if (localStorage.isAuthenticated === "true") {
    window.location.replace("/play.html")
  } else {
    window.location.replace("/login.html");
    alert("Please sign in first")
  }
}


$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form#form");
  const firstNameInput = $("input#first_name");
  const lastNameInput = $("input#last_name");
  const emailInput = $("input#email");
  const passwordInput = $("input#password");


  // When the signup button is clicked, we validate the first name, last name, email and password are not blank
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
      return;
    }
    // If we have an first name, last name, email and password, run the signUpUser function
    signUpUser(userData.firstName, userData.lastName, userData.email, userData.password)
      ;
    firstNameInput.val("");
    lastNameInput.val("");
    emailInput.val("");
    passwordInput.val("");

  });

  // Does a post to the signup route. If successful, we are redirected to the play page
  // Otherwise we log any errors
  function signUpUser(firstName, lastName, email, password) {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })
      .then(() => {
        localStorage.setItem("userEmail", email)
        localStorage.setItem("isAuthenticated", true)
        window.location.replace("/play.html");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

function validateUser() {
  if (localStorage.isAuthenticated === "true") {
    window.location.replace("/play.html")
  } else {
    window.location.replace("/signup.html");
  }
}

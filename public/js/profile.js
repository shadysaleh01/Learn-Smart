$(document).ready(() => {
   const firstName = $("#firstName")
   const lastName = $("#lastName")
   const email = $("#email")
   // const password = $("#password")
   const squad = $("#squad")
   const score = $("#score")

   $.get("/api/user/" + localStorage.userEmail, (data) => {
      firstName.text(data.firstName)
      lastName.text(data.lastName)
      email.text(data.email)
      // password.text(data.password)
      squad.text(localStorage.userChosenSquad)
      score.text(localStorage.finalScore)
   })
})

//////* nav bar menu *///////
document.addEventListener('DOMContentLoaded', function () {
   var elems = document.querySelectorAll('.sidenav');
   // var options = {}
   var instances = M.Sidenav.init(elems, {});
});
var collapsibleElem = document.querySelector(".collapsible");
var collapsibleInstance = M.Collapsible.init(collapsibleElem, {});

/////// nav bar profile picture //////
document.addEventListener('DOMContentLoaded', function () {
   var elems = document.querySelectorAll('.dropdown-trigger');
   var options = { constrainWidth: false, coverTrigger: false, alignment: 'left', closeOnClick: false }
   var instances = M.Dropdown.init(elems, options);
});

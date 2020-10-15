$(document).ready(() => {
   const firstName = $("#firstName")
   const lastName = $("#lastName")
   const email = $("#email")
   const password = $("#password")
   const squad = $("#squad")
   const score = $("#score")

   console.log(localStorage.userEmail)

   a.get("/api/user/;" + localStorage.userEmail, (data) => {
      console.log(data)
      firstName.val(data.firstName)
      lastName.val(data.lastName)
      email.val(data.email)
      password.val(data.password)
      squad.val(data.squad)
      score.val(data.score)
   })


})
/////// nav bar profile picture //////
document.addEventListener('DOMContentLoaded', function () {
   var elems = document.querySelectorAll('.dropdown-trigger');
   var options = { constrainWidth: false, coverTrigger: false, alignment: 'left', closeOnClick: false }
   var instances = M.Dropdown.init(elems, options);
});
var instance = M.Dropdown.getInstance(elem);
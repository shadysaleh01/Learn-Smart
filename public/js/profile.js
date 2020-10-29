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

window.addEventListener('load', function () {
   document.querySelector('input[type="file"]').addEventListener('change', function () {
      if (this.files && this.files[0]) {
         var img = document.querySelector('img');  // $('img')[0]
         img.src = URL.createObjectURL(this.files[0]); // set src to blob url
         img.onload = imageIsLoaded;
      }
   });
});
function imageIsLoaded() {
   const twoValue = { img: this.src, email: localStorage.userEmail }
   $.ajax({
      method: "PUT",
      url: "/api/img",
      data: twoValue
   }).then(() => {

   })
}
const firstName = $("#firstName")
const lastName = $("#lastName")
const email = $("#email")
// const password = $("#password")
const squad = $("#squad")
const score = $("#score")
$.get("/api/user/" + localStorage.userEmail, (data) => {
   console.log(data)
   ////// nav bar pic //////
   var navPic = document.getElementById('navPic')
   navPic.src = data.img
   ////// profile info //////
   firstName.text(data.firstName)
   lastName.text(data.lastName)
   email.text(data.email)
   // password.text(data.password)
   squad.text(localStorage.userChosenSquadProfile)
   score.text(localStorage.finalScoreProfile)
   var mainPic = document.getElementById('mainPic')
   mainPic.src = data.img
   ////// nav bar side //////
   $('#name').text(data.firstName + " " + data.lastName)
   $('#emailSid').text(data.email)
   var navSidPic = document.getElementById('navSidPic')
   navSidPic.src = data.img
})

function logout() {
   localStorage.clear();
   window.location.replace("/home.html");
}
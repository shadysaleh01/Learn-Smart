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

// /* The uploader form */
// $(function () {
//    $(":file").change(function () {
//       if (this.files && this.files[0]) {
//          var reader = new FileReader();

//          reader.onload = imageIsLoaded;
//          reader.readAsDataURL(this.files[0]);
//       }
//    });
// });

// function imageIsLoaded(e) {
//    $('#myImg').attr('src', e.target.result);
//    $('#yourImage').attr('src', e.target.result);
// };

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
   // localStorage.setItem("imgURL", this.src);
   // var img = document.querySelector('img')  // blob url
   // img.src = localStorage.imgURL
   // const email = localStorage.userEmail
   // const img = this.src

   const twoValue = { img: this.src, email: localStorage.userEmail }

   $.ajax({
      method: "PUT",
      url: "/api/img",
      data: twoValue
   }).then(() => {

   })

}

//////// GET ajax to display user picture in the nav bar and profile page ////////
$.get("/api/user/" + localStorage.userEmail, (data) => {
   console.log(data)
   $('#name').text(data.firstName + " " + data.lastName)
   $('#email').text(data.email)
   var navPic = document.getElementById('navPic')
   navPic.src = data.img
   var navSidPic = document.getElementById('navSidPic')
   navSidPic.src = data.img
   var mainPic = document.getElementById('mainPic')
   mainPic.src = data.img

   // img.src = data.img
   // console.log(img.src)
}).then(() => {
   // console.log(data)

})
function logout() {
   localStorage.clear();
   window.location.replace("/home.html");
}
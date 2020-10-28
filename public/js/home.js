function validateUser() {
   if (localStorage.isAuthenticated === "true") {
      window.location.replace("/play.html")
   } else {
      window.location.replace("/login.html");
   }
}

//////* Nav Bar about button */////
$('nav a').on('click', function (e) {
   // Define variable of the clicked »a« element (»this«) and get its href value.
   var href = $(this).attr('href');

   // Run a scroll animation to the position of the element which has the same id like the href value.
   $('html, body').animate(
      {
         scrollTop: $(href).offset().top,
      },
      '300'
   );
   e.preventDefault();
});

//////* nav bar menu *///////
document.addEventListener('DOMContentLoaded', function () {
   var elems = document.querySelectorAll('.sidenav');
   // var options = {}
   var instances = M.Sidenav.init(elems, {});
});
var collapsibleElem = document.querySelector(".collapsible");
var collapsibleInstance = M.Collapsible.init(collapsibleElem, {});

//////// GET ajax to display user picture in the nav bar////////
$.get("/api/user/" + localStorage.userEmail, (data) => {
   console.log(data)
   $('#name').text(data.firstName + " " + data.lastName)
   $('#email').text(data.email)
   var navPic = document.getElementById('navPic')
   navPic.src = data.img
   var navSidPic = document.getElementById('navSidPic')
   navSidPic.src = data.img
   // img.src = data.img
   // console.log(img.src)
})

// const twoValue = { img: squad, email: localStorage.userEmail }
// $.ajax({
//   method: "PUT",
//   url: "/api/squad",
//   data: twoValue
// }).then((res) => {
//   // res.json(res)
// })

// document.addEventListener('DOMContentLoaded', function () {
//    var elems = document.querySelectorAll('.sidenav-trigger');
//    // var options = {}
//    var instances = M.Sidenav.init(elems);
// });

if (localStorage.isAuthenticated === "true") {
   document.getElementById("login").style.display = "none"
   document.getElementById("logout").style.display = "block"
} else {
   document.getElementById("login").style.display = "block"
   document.getElementById("logout").style.display = "none"
}
if (localStorage.isAuthenticated === "true") {
   document.getElementById("loginMenu").style.display = "none"
   document.getElementById("logoutMenu").style.display = "block"
} else {
   document.getElementById("loginMenu").style.display = "block"
   document.getElementById("logoutMenu").style.display = "none"
}

// function login() {
//      window.location.replace("/login.html");

// }


function logout() {
   localStorage.clear();
   window.location.replace("/home.html");
}
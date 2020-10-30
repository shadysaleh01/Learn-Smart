function validateUser() {
   if (localStorage.isAuthenticated === "true") {
      window.location.replace("/play.html")
   } else {
      window.location.replace("/login.html");
   }
}
////// If Statment to update nav bar based user status //////
if (localStorage.isAuthenticated === "true") {
   document.getElementById("login").style.display = "none"
   document.getElementById("logout").style.display = "block"
} else {
   document.getElementById("login").style.display = "block"
   document.getElementById("logout").style.display = "none"
}
////// If Statment to update nav bar menu based user status //////
if (localStorage.isAuthenticated === "true") {
   document.getElementById("loginMenu").style.display = "none"
   document.getElementById("logoutMenu").style.display = "block"
} else {
   document.getElementById("loginMenu").style.display = "block"
   document.getElementById("logoutMenu").style.display = "none"
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

//////* nav bar menu mobile view *///////
document.addEventListener('DOMContentLoaded', function () {
   var elems = document.querySelectorAll('.sidenav');
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
// Banner section
document.addEventListener('DOMContentLoaded', function () {
   var elems = document.querySelectorAll('.slider');
   var options = { indicators: true, height: 900 }
   var options = { indicators: true, height: 450, interval: 2500 }
   var instance = M.Slider.init(elems, options);
});


function logout() {
   localStorage.clear();
   window.location.replace("/home.html");
}
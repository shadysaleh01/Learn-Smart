//////* Nav Bar */////
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

//////* Banner Section *//////
document.addEventListener('DOMContentLoaded', function () {
   var elems = document.querySelectorAll('.slider');
   var options = { indicators: true, height: 450, interval: 2500 }
   var instance = M.Slider.init(elems, options);

});

// document.addEventListener('DOMContentLoaded', function () {
//    var elems = document.querySelectorAll('.sidenav');
//    var instances = M.Sidenav.init(elems, options);
//    var instance = M.Sidenav.getInstance(elem);
//    instance.open()
// });


function validateUser() {
   if (localStorage.isAuthenticated === "true") {
      window.location.replace("/play.html")
   } else {
      window.location.replace("/login.html");
   }
}

if (localStorage.isAuthenticated === "true") {

   document.getElementById("login").style.display = "none"
   document.getElementById("logout").style.display = "block"
} else {
   document.getElementById("login").style.display = "block"
   document.getElementById("logout").style.display = "none"
}

function logout() {
   localStorage.clear();
   window.location.replace("/home.html");
}
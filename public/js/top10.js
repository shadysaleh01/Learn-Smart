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
   window.location.replace("/top10.html");
}

//////nav bar menu mobile view /////
document.addEventListener('DOMContentLoaded', function () {
   var elems = document.querySelectorAll('.sidenav');
   // var options = {}
   var instances = M.Sidenav.init(elems, {});
});
var collapsibleElem = document.querySelector(".collapsible");
var collapsibleInstance = M.Collapsible.init(collapsibleElem, {});

////// for loop to update nav bar menu based user status //////
if (localStorage.isAuthenticated === "true") {
   document.getElementById("loginMenu").style.display = "none"
   document.getElementById("logoutMenu").style.display = "block"
} else {
   document.getElementById("loginMenu").style.display = "block"
   document.getElementById("logoutMenu").style.display = "none"
}


/////// nav bar profile picture //////
document.addEventListener('DOMContentLoaded', function () {
   var elems = document.querySelectorAll('.dropdown-trigger');
   var options = { constrainWidth: false, coverTrigger: false, alignment: 'left', closeOnClick: false }
   var instances = M.Dropdown.init(elems, options);
});
var instance = M.Dropdown.getInstance(elem);

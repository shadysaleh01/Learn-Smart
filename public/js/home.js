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


$(document).ready(() => {

  $("#hide-toggle").on("click", function (event) {
    var state = $("#answers-area").data("state");
    console.log(state);
    if (state === "showing") {
      $("#answers-area").data("state", "hiding");
      $("#answers-area").addClass("hide");
      $("#clicker-area").removeClass("hide");
      $("#clicker-area").data("state", "showing");
      $("#question-display").html(
        "Click the <span class='red' style='color:white'>blue</span> button!"
      );
    } else {
      $("#answers-area").data("state", "showing");
      $("#answers-area").removeClass("hide");
      $("#clicker-area").addClass("hide");
      $("#clicker-area").data("state", "hiding");
      $("#question-display").html(
        "This tiny tyrant ruled across Europe at 5 feet 6 inches"
      );
    }
  });

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

});

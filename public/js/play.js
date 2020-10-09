$(document).ready(() => {
  // hide multiple choice toggle
  let squadChoice = "____";
  let categoryChoice = "____";
  $("#squad-setting").text(squadChoice);
  $("#cat-setting").text(categoryChoice);
  $(".team-choice").on("click", function (event) {
    squadChoice = $(this).data("squad");
    console.log(squadChoice);
    $("#squad-setting").text(squadChoice);
  });

  $(".category-btn").on("click", function (event) {
    categoryChoice = $(this).data("category");
    console.log(categoryChoice);
    $("#cat-setting").text(categoryChoice);
  });

  $("#hide-toggle").on("click", function (event) {
    var state = $("#answers-area").data("state");

    console.log(state);
    if (state === "showing") {
      $("#answers-area").data("state", "hiding");
      $("#answers-area").addClass("hide");
      $("#clicker-area").removeClass("hide");
      $("#clicker-area").data("state", "showing");
      $("#question-display").html(
        "Click the <span class='red' id='clickerSpan' style='color:white'>blue</span> button!"
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

  // hide game over overlays
  $("#hide-toggle-game-over").on("click", function (event) {
    // toggle the overlays
    $("#game-over").addClass("hide");
    $("#overlay-background").addClass("hide");
  });
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });
});

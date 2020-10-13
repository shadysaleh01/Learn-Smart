// const { all } = require("sequelize/types/lib/operators");

// const { all } = require("sequelize/types/lib/operators");

$(document).ready(() => {
  // hide multiple choice toggle
  // debugger;


  if (!localStorage.isAuthenticated) {
    window.location.replace("/login.html");
  }

  // if (localStorage.isAuthenticated === "true") {
  //   document.getElementById("login").style.display = "none"
  //   document.getElementById("logout").style.display = "block"
  // } else {
  //   document.getElementById("login").style.display = "block"
  //   document.getElementById("logout").style.display = "none"
  // }

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
    categoryChosen(categoryChoice)
  });

  $("#hide-toggle").on("click", function (event) {
    let state = $("#q-and-a").data("state");

    // console.log(state);
    if (state === "showing") {
      // $("#answers-area").data("state", "hiding");
      // $("#answers-area").addClass("hide");
      // $("#clicker-area").removeClass("hide");
      // $("#clicker-area").data("state", "showing");
      // $("#question-display").html(
      //   "Click the <span class='red' id='clickerSpan' style='color:white'>blue</span> button!"
      // );
      $("#q-and-a").data("state", "hiding");
      $("#q-and-a").addClass("hide");
      $("#cat-encap").data("state", "showing");
      $("#cat-encap").removeClass("hide");
    } else {
      // $("#answers-area").data("state", "showing");
      // $("#answers-area").removeClass("hide");
      // $("#clicker-area").addClass("hide");
      // $("#clicker-area").data("state", "hiding");
      // $("#question-display").html(
      //   "This tiny tyrant ruled across Europe at 5 feet 6 inches"
      // );
      $("#q-and-a").data("state", "showing");
      $("#q-and-a").removeClass("hide");
      $("#cat-encap").data("state", "hiding");
      $("#cat-encap").addClass("hide");
    }
  });

  // hide game over overlays
  $(".hide-toggle-game-over").on("click", function (event) {
    // toggle the overlays
    let state = $("#game-over-encap").data("state");
    // console.log(state);
    if (state === "showing") {
      $("#game-over-encap").addClass("hide");
      $("#game-over-encap").data("state", "hiding");
    } else {
      $("#game-over-encap").removeClass("hide");
      $("#game-over-encap").data("state", "showing");
    }

  });



  $("#hide-toggle-map").on("click", function (event) {
    let state = $("#map-encap").data("state");
    // console.log(state);
    if (state === "hiding") {
      $("#map-encap").removeClass("hide");
      $("#map-encap").data("state", "showing");
      $("#q-and-a").data("state", "hiding");
      $("#q-and-a").addClass("hide");
    } else {
      $("#map-encap").addClass("hide");
      $("#map-encap").data("state", "hiding");
      $("#q-and-a").data("state", "showing");
      $("#q-and-a").removeClass("hide");
    }
  });


  $(".team-choice").on("click", function (event) {
    let squad = $(this).data("squad");
    squadChosen(squad)
  });

  function squadChosen(squad) {
    const twoValue = { squad: squad, email: localStorage.userEmail }
    $.ajax({
      method: "PUT",
      url: "/api/squad",
      data: twoValue
    }).then((res) => {
      // res.json(res)
    })
  }

  function updateScore() {
    const twoValue = { score: score, email: localStorage.userEmail }
    $.ajax({
      method: "PUT",
      url: "/api/squad",
      data: twoValue
    })
  }

});

function logout() {
  localStorage.clear();
  window.location.replace("/home.html");
}



















let categoryData = []; // array of answer/question/category objects
let allAnswersArr = []; // all possible answers in our category
let fourChoices = []; // four possible choices

let squadChoice = "____"; // our choices start blank
let categoryChoice = "____";
let score = 0;
let moneyArray = [100, 150, 325, 610, 830, 1000, 1250, 1460, 1680, 1800];
let quiz10 = []; // finalize our 10 questions
let currentQuestion = 0;
const quizLength = 9; // ten questions, 0 index

var timerInterval;

// hide on load here
$("#score-time-encap").hide();
$("#q-and-a").hide();
$("#game-over-encap").hide();
$("#map-encap").hide();
//////nav bar menu mobile view /////
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
// var instance = M.Dropdown.getInstance(elem);

$(document).ready(() => {

  $(".category-btn").on("click", function (event) {
    categoryChoice = $(this).data("category");
    $("#cat-setting").text(categoryChoice);
    localStorage.setItem("userChosenCat", categoryChoice);
    playSound("bump");
    categoryChosen(categoryChoice)
  });


  if (!localStorage.isAuthenticated) {
    window.location.replace("/login.html");
  }

  $("#squad-setting").text(squadChoice);
  $("#cat-setting").text(categoryChoice);

  $(".team-choice").on("click", function (event) {
    squadChoice = $(this).data("squad");
    $("#squad-setting").text(squadChoice);
    localStorage.setItem("userChosenSquad", squadChoice)
    // squadChosen(squadChoice);
  });

  $("#play-btn").on("click", function (event) {
    // * verification to check if both a category && squad is chosen
    if (squadChoice === "____" || categoryChoice === "____") {
      return;
    }
    console.log("--------- lets play! ----------");
    startQuiz();
  });

  $(".answer").on("click", verifyResponse);

  // event listeners for retaking quizzes
  $("#play-this-again").on("click", function (event) {
    if($("#initials").val() === ""){
      return;
    }
    localStorage.setItem("userInits", $("#initials").val()); 
    // restore click-ability of squares
    $(".mapSquare").attr("style", null);
    // hide game over display
    $("#game-over-encap").hide();
    postScore();
    startQuiz();
  });

  $("#play-new-cat").on("click", function (event) {
    if($("#initials").val() === ""){
      return;
    }
    localStorage.setItem("userInits", $("#initials").val()); 
    // restore click-ability of squares
    $(".mapSquare").attr("style", null);
    // hide all displays
    $("#game-over-encap").hide();
    $("#score-time-encap").hide();
    $("#q-and-a").hide();
    // show only category display
    $("#cat-encap").fadeIn("slow");
    postScore();
  });

  // go to map button!
  $("#mark-map").on("click", function (event) {
    if($("#initials").val() === ""){
      return;
    }
    // cannot click on play again until map marked
    $("#play-again-map").attr("style", "pointer-events:none; background-color: gray; color: white");
    // get initials input and save them
    localStorage.setItem("userInits", $("#initials").val());
    console.log($("#initials").val());
    // postScore();
    $("#game-over-encap").hide();
    $("#score-time-encap").hide();
    $("#map-encap").fadeIn("slow");
    // $("#map-encap").removeClass("hide");
  });
  // claiming a space
  $(".mapSquare").on("click", function(event){
    let id = $(this).data("id");
    // allow play again to be clicked
    $("#play-again-map").attr("style", null);
    // remove remembered classes
    $(this).removeClass();
    $(this).addClass("mapSquare valign-wrapper no-select");
    // add the new color class and text
    $(this).addClass(`${localStorage.userChosenSquad}`);
    $(this).text(`${localStorage.userInits}`);
    // remove click-ability after one click
    $(".mapSquare").attr("style", "pointer-events:none");
    postScore();
    // map square table
    updateMapSquare({id: id, color: localStorage.userChosenSquad, inits: localStorage.userInits});
  });

  $("#play-again-map").on("click", function(event){
    $(".mapSquare").attr("style", null);
    // hide all displays
    $("#game-over-encap").hide();
    $("#score-time-encap").hide();
    $("#q-and-a").hide();
    $("#map-encap").hide();
    // show only category display
    $("#cat-encap").fadeIn("slow");
  })

});

/////////// Category Div /////////////////
function categoryChosen(category) {
  $.get(`/api/questions/category/${category}`, (data) => {
    // ! reset our arrays every time you select a new category
    allAnswersArr = [];
    fourChoices = [];
    categoryData = [];
    // copy the data onto our global array
    for (let i = 0; i < data.length; i++) {
      categoryData.push(data[i]);
    }
    // ! setting the pool of all answers in this category
    for (let i = 0; i < data.length; i++) {
      allAnswersArr.push(categoryData[i].answer);
    }
  });
}

////////// Questions & Answers ///////////
// taken from https://javascript.info/task/shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ! START THE QUIZ LOGIC HERE -------------------------------------
function verifyResponse() {
  // grab the elements answer text
  let thisAnswer = $(this).text();
  let timeOutId = 0;
  if (thisAnswer === quiz10[currentQuestion].answer) {
    // score increases by this questions progressive value
    score = score + moneyArray[currentQuestion];  // correct!
    $("#cash-display").text(`Cash: $${score}`);
    $(".answer").attr("style", "pointer-events:none");
    $(this).attr("style", "background-color: rgb(104, 226, 56); border-color: black; color: white; box-shadow: 0px 5px 2px rgb(104, 226, 56); pointer-events: none");

    // timeOutId = window.setTimeout(renderQuestion, 600);
  } else {
    // wrong!
    $(".answer").attr("style", "pointer-events:none");
    $(this).attr("style", "background-color: red; border-color: black; color: white; box-shadow: 0px 5px 2px red; pointer-events:none");

  }
  currentQuestion++;
  // renderQuestion();
  timeOutId = window.setTimeout(renderQuestion, 600);
}

function renderQuestion() {
  // ! game over if we run out of questions
  if (currentQuestion >= quiz10.length) {
    currentQuestion = 0;
    console.log("GAME OVER");
    gameOver();
    return;
  }
  // ! reset correct/incorrect color display
  $(".answer").attr("style", null);
  // reset score display as well

  // ! reset our answer choices which each rendered question
  fourChoices = [];
  // ! establish our correct answer first
  // ! and push it onto our pool of choices
  let correctAnswer = quiz10[currentQuestion].answer;
  fourChoices.push(correctAnswer);
  // ! while loop that doesn't allow duplicate answer choices
  let j = 0;
  let temp0 = "";
  let temp1 = "";
  let temp2 = "";
  while (j < 3) {
    if (j === 1 || j === 2) {
      if (j === 1) {
        temp1 = allAnswersArr[Math.floor(Math.random() * allAnswersArr.length)];
        if (temp0 !== temp1 && correctAnswer !== temp1) {
          fourChoices.push(temp1);
          j++;
        }
      } else {  // j===2, last possible answer
        temp2 = allAnswersArr[Math.floor(Math.random() * allAnswersArr.length)];
        if (temp2 !== temp1 && temp2 !== temp0 && temp2 !== correctAnswer) {
          fourChoices.push(temp2);
          j++;
        }
      }
    } else { // j===0 first iteration
      temp0 = allAnswersArr[Math.floor(Math.random() * allAnswersArr.length)];
      if (temp0 !== correctAnswer) {
        fourChoices.push(temp0);
        j++;
      }
    }
  }
  // ! shuffle array
  fourChoices = shuffle(fourChoices);
  $("#question-display").text(quiz10[currentQuestion].question);
  $("#answer-1").text(fourChoices[0])
  $("#answer-2").text(fourChoices[1])
  $("#answer-3").text(fourChoices[2])
  $("#answer-4").text(fourChoices[3])
}

function startQuiz() {
  // ! reset quiz index and score and time
  currentQuestion = 0;
  score = 0;
  currentTime = 50;
  // ? show and hide divs stuff goes here
  $("#cash-display").text(`Cash: $${score}`);
  $("#time-display").text("Time: 40");
  $("#cat-encap").hide();
  $("#q-and-a").fadeIn("fast");
  $("#score-time-encap").fadeIn("fast");
  $("#congratulations-msg").addClass("hide");
  $("#try-again-msg").addClass("hide");
  $("#map-btn").addClass("hide");
  // ? set the timer here
  setTime();
  // ? shuffle then start rendering questions
  categoryData = shuffle(categoryData);
  // ! reset the 10 questions
  quiz10 = [];
  // ? how many questions do we want in our quiz? loop 10 times!
  for (let k = 0; k < 10; k++) {
    quiz10.push(categoryData[k]);
  }
  renderQuestion();
}

function setTime() {
  timerInterval = setInterval(function () {
    currentTime--;
    $("#time-display").text(`Time: ${currentTime}`);
    // Time is up, game over
    if (currentTime <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
    // if you have less than 10 secs left
    // display a red shadow around the timer
    if (currentTime <= 10) {
      $("#time-display").attr("style", "color: red");
    }
  }, 1000);
}
/////////////// Gameover Div ////////////////
function gameOver() {
  $("#q-and-a").hide();
  $("#game-over-encap").fadeIn("slow");
  $("#user-score").text(score);
  localStorage.setItem("finalScore", score)
  clearInterval(timerInterval); // freeze time

  if (score >= 100) {
    // reveal congrats
    $("#congratulations-msg").removeClass("hide");
    // reveal go to map button
    $("#map-btn").removeClass("hide");
  } else {  // you failed!
    $("#try-again-msg").removeClass("hide");
  }
}
///////////////////////////////////////////////////////////////////////
//////////////////////// Map Section /////////////////////////////////

//// funciton to update the square info////
function updateMapSquare(data) {
  let twoValue = { color: data.color, inits: data.inits };
  let squareId = data.id;
  console.log(twoValue);
  console.log(squareId);
  $.ajax({
    method: "PUT",
    url: "/api/mapsquare/" + squareId,
    data: twoValue
  }).then((res) => {
    console.log(".....after the put request for the squares");
    res.json(res);
  })
}

function postScore(){
  $.post("/api/maps", {
    email: localStorage.userEmail,
    squad: localStorage.userChosenSquad,
    inits: localStorage.userInits,
    score: localStorage.finalScore,
    category: localStorage.userChosenCat
  })
    .then((data) => {
      console.log(data)
      localStorage.removeItem("userChosenSquad")
      localStorage.removeItem("userChosenCat")
      localStorage.removeItem("finalScore")
    });
}

////funtion to get all data from map square table///
$.get("/api/mapsquare", (data) => {
  console.log(data);
  // loop through all squares and color them and write inits
  for(let i = 1; i < 17; i++){
    $(`#${i}`).removeClass();
    $(`#${i}`).addClass(`mapSquare valign-wrapper no-select ${data[i-1].color}`);
    $(`#${i}`).text(`${data[i-1].inits}`);
  }

})

/////// funtion to logout the user/////////
function logout() {
  localStorage.clear();
  window.location.replace("/home.html");
}

/////// GET ajax to get all maps table data /////////
// $.get("/api/maps/", (data) => {
//   console.log(data)
// })



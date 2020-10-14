
let categoryData = []; // array of answer/question/category objects
let allAnswersArr = []; // all possible answers in our category
let fourChoices = []; // four possible choices

let squadChoice = "____"; // our choices start blank
let categoryChoice = "____";
let score = 0;
let quiz10 = []; // finalize our 10 questions
let currentQuestion = 0;
const quizLength = 9; // ten questions, 0 index

$(document).ready(() => {
  if (!localStorage.isAuthenticated) {
    window.location.replace("/login.html");
  }

  $("#squad-setting").text(squadChoice);
  $("#cat-setting").text(categoryChoice);

  $(".team-choice").on("click", function (event) {
    squadChoice = $(this).data("squad");
    console.log(squadChoice);
    $("#squad-setting").text(squadChoice);
    squadChosen(squadChoice);
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

      $("#q-and-a").data("state", "hiding");
      $("#q-and-a").addClass("hide");
      $("#cat-encap").data("state", "showing");
      $("#cat-encap").removeClass("hide");
    } else {

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

  $("#play-btn").on("click", function (event) {
    // * verification to check if both a category && squad is chosen
    if (squadChoice === "____" || categoryChoice === "____") {
      return;
    }
    console.log("--------- lets play! ----------");
    startQuiz();
  });

  $(".answer").on("click", verifyResponse);

<<<<<<< HEAD
  // event listeners for retaking quizzes
  $("#play-this-again").on("click", startQuiz);
  $("#play-new-cat").on("click", function(event) {
    $("#game-over-encap").fadeOut("slow");
    $("#game-over-encap").addClass("hide");
    $("#game-over-encap").data("state", "hiding");
    $("#q-and-a").data("state", "hiding");
    $("#q-and-a").addClass("hide");
    $("#cat-encap").data("state", "showing");
    $("#cat-encap").removeClass("hide");
  });



=======
  ///// ajax to update the uesr's squad //////
>>>>>>> f6dc778c645b90837585c8d785841909c0e4903e
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

  ////// ajax to update the uesr's sore /////
  function updateScore(score) {
    const twoValue = { score: score, email: localStorage.userEmail }
    $.ajax({
      method: "PUT",
      url: "/api/score",
      data: twoValue
    })
  }
});

// taken from https://javascript.info/task/shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function logout() {
  localStorage.clear();
  window.location.replace("/home.html");
}

// ! START THE QUIZ LOGIC HERE -------------------------------------
function verifyResponse() {
  console.log("verifying.....");
  // grab the elements answer text
  let thisAnswer = $(this).text();
  console.log(`this answer: ${thisAnswer}`);
  if (thisAnswer === quiz10[currentQuestion].answer) {
    score = score + 100;  // correct!
    console.log(`CORRECT! your score is now ${score}`);
  } else {
    console.log("WRONG"); // wrong!
  }
  currentQuestion++;
  renderQuestion();
}

function renderQuestion() {
  // ! game over if we run out of questions
  if (currentQuestion >= quiz10.length) {
    currentQuestion = 0;
    console.log("GAME OVERRRRRRRRRRRRRRRRRR");
    gameOver();
    return;
  }
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
  // ? show and hide divs stuff goes here
  // hide game over screen
  $("#congratulations-msg").addClass("hide");
  $("#try-again-msg").addClass("hide");
  $("#map-btn").addClass("hide");
  $("#game-over-encap").fadeOut("slow");
  $("#game-over-encap").addClass("hide");
  $("#game-over-encap").data("state", "hiding");
  $("#q-and-a").data("state", "showing");
  $("#q-and-a").removeClass("hide");
  $("#cat-encap").data("state", "hiding");
  $("#cat-encap").addClass("hide");
  // ! reset quiz index and score
  currentQuestion = 0;
  score = 0;
  // ? set the timer here
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

function gameOver() {
  $("#q-and-a").addClass("hide");
  $("#game-over-encap").fadeIn("slow");
  $("#game-over-encap").removeClass("hide");
  $("#game-over-encap").data("state", "showing");
  // $("#user-name").text(userName);
  $("#user-score").text(score);

  if(score >= 700) {
    // reveal congrats
    $("#congratulations-msg").removeClass("hide");
    // reveal go to map button
    $("#map-btn").removeClass("hide");
  } else {  // you failed!
    $("#try-again-msg").removeClass("hide");
  }
}
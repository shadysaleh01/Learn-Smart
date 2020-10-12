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
      let allAnswersArr = [];
      let fourChoices = [];

      for (let i = 0; i < data.length; i++) {
        allAnswersArr.push(data[i].answer);
      }
      // for (let i = 0; i < 3; i++) {
      //   fourChoices.push(allAnswersArr[i]);
      // }

      // ! establish our correct answer first
      // ! and push it onto our pool of choices
      let randomDataObj = data[Math.floor(Math.random() * data.length)];
        let correctAnswer = randomDataObj.answer;
        fourChoices.push(correctAnswer);
      // ! while loop that doesn't allow duplicate answer choices
      let j = 0;
      let temp0 = "";
      let temp1 = "";
      let temp2 = "";
      while (j < 3) {
        if( j === 1 || j === 2 ){
          if(j === 1){
            temp1 = allAnswersArr[Math.floor(Math.random() * allAnswersArr.length)];
            if( temp0 !== temp1 && correctAnswer !== temp1){
              fourChoices.push(temp1);
              j++;
            } 
          } else {  // j===2, last possible answer
            temp2 = allAnswersArr[Math.floor(Math.random() * allAnswersArr.length)];
            if( temp2 !== temp1 && temp2 !== temp0 && temp2 !== correctAnswer){
              fourChoices.push(temp2);
              j++;
            } 
          }
        } else { // j===0 first iteration
          temp0 = allAnswersArr[Math.floor(Math.random() * allAnswersArr.length)];
          if(temp0 !== correctAnswer){
            fourChoices.push(temp0);
          j++;
          }
        }
      }
      // ! shuffle array
      let randomizedArray = shuffle(fourChoices);
        // let randomData = data[Math.floor(Math.random() * data.length)];
        // fourChoices.push(randomData.answer)
        // let dddd = []
        // for (let i = 0; i < 4; i++) {
        //   dddd.push(fourChoices[Math.floor(Math.random() * 4)])
        // }
        // console.log(dddd)
        $("#question-display").text(randomDataObj.question)
        $("#answer-1").text(randomizedArray[0])
        $("#answer-2").text(randomizedArray[1])
        $("#answer-3").text(randomizedArray[2])
        $("#answer-4").text(randomizedArray[3])
 

      // $("#hide-toggle").on("click", () => {
      //   let randomData = data[Math.floor(Math.random() * data.length)];
      //   fourChoices.push(randomData.answer)
      //   // let dddd = []
      //   // for (let i = 0; i < 4; i++) {
      //   //   dddd.push(fourChoices[Math.floor(Math.random() * 4)])
      //   // }
      //   // console.log(dddd)
      //   $("#question-display").text(randomData.question)
      //   $("#answer-1").text(fourChoices[0])
      //   $("#answer-2").text(fourChoices[1])
      //   $("#answer-3").text(fourChoices[2])
      //   $("#answer-4").text(fourChoices[3])
      // });
    });
  }

  



  console.log(localStorage.userEmail)



  function squadChosen(squad) {

    const twoValue = { squad: squad, email: localStorage.getItem("userEmail") }
    console.log(twoValue.squad);
    console.log("--------------------------");
    console.log(twoValue.email);
    $.ajax({
      method: "PUT",
      url: "/api/squad",
      data: twoValue
    }).then((res) => {
      console.log("********************");
      console.log(res);
      console.log("update successful");
      
      // res.json(res);
      
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
const gameContainer = document.getElementById("game");
const startButton = document.querySelector("#startButton");
let checkLevel;
let preClass = null;
let colorArray = [];
let clickCount = 0;
let minMoves = 0;
let COLORS = [];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked  

  if (clickCount < 2 && preClass != event.target) {
    // console.log("you clicked", event.target, preClass);
    let moves = document.querySelector(".moves");
    const bestScore = document.getElementsByClassName("bestScore")[0];
    if (!localStorage.getItem("BestMoves")) {
      bestScore.innerHTML = "Best Score: 0";
    } else {
      bestScore.innerHTML = "Best Score: " + localStorage.getItem("BestMoves");
    }

    event.target.classList.toggle("rotate");
    minMoves += 1;
    moves.innerHTML = "Moves= " + minMoves;
    // console.log(event.target.className.split(" ")[0]);

    if (!preClass) {

      preClass = event.target;
      console.log(event.target.className.split(" ")[0]);
      event.target.style.backgroundImage = `url("${event.target.className.split(" ")[0]}")`;
      event.target.style.backgroundSize = "cover";
      clickCount += 1;
    }
    else if (preClass.className.split(" ")[0] == event.target.className.split(" ")[0]) {

      event.target.style.backgroundImage = `url("${event.target.className.split(" ")[0]}")`;
      event.target.style.backgroundSize = "cover";
      clickCount = 0;
      colorArray.push(event.target.className);
      event.target.removeEventListener("click", handleCardClick);
      preClass.removeEventListener("click", handleCardClick);
      preClass = null;

      if ((colorArray.length == 3 && checkLevel == "1") || (colorArray.length == 4 && checkLevel == "2") || (colorArray.length == 8 && checkLevel == "3")) {

        console.log(colorArray);
        let winner = document.querySelector("#winner");
        winner.style.display = "block";
        winner.style["text-align"] = "center";
        // winner.innerHTML = `Winner<br/> Your Score ` + minMoves + "<br/>Minimum Moves: " + minMoves;

        if (!localStorage.getItem("BestMoves")) {
          localStorage.setItem("BestMoves", minMoves);
          winner.innerHTML = `Winner<br/> Your Score ` + minMoves + "<br/>Minimum Moves: " + minMoves;
        }
        else if (minMoves <= localStorage.getItem("BestMoves")) {
          winner.innerHTML = `Winner<br/> Your Score ` + minMoves + "<br/>Minimum Moves: " + minMoves;
          localStorage.setItem("BestMoves", minMoves);
        }
        else {
          winner.innerHTML = `Winner<br/> Your Score ` + minMoves + "<br/>Minimum Moves: " + localStorage.getItem("BestMoves");


        }

      }

    }
    else {
      event.target.style.backgroundImage = `url("${event.target.className.split(" ")[0]}")`;
      clickCount += 1;

      setTimeout(() => {

        event.target.style.backgroundImage = "none";
        event.target.style.backgroundImage = "linear-gradient(to right bottom, violet, blue, white)";

        preClass.style.backgroundImage = "none";
        preClass.style.backgroundImage = "linear-gradient(to right bottom, violet, blue, white)";

        preClass = null;
        clickCount = 0;
      }, 1000);
    }
  }
}


startButton.addEventListener('click', function (event) {
  const mainPageContent = document.querySelector("#mainPageContent");
  const game = document.querySelector("#game");
  const moves = document.querySelector(".moves");
  const restartButton = document.querySelector("#restartButton");
  const resetButton = document.querySelector("#resetButton");
  const levels = document.getElementById("levels");
  const bestScore = document.getElementsByClassName("bestScore")[0];
  if (!localStorage.getItem("BestMoves")) {
    bestScore.innerHTML = "Best Score: 0";
  } else {
    bestScore.innerHTML = "Best Score: " + localStorage.getItem("BestMoves");
  }

  if (levels.value === "1") {
    checkLevel = "1";
    COLORS = [
      "./gifs/1.gif",
      "./gifs/2.gif",
      "./gifs/3.gif",
      "./gifs/1.gif",
      "./gifs/2.gif",
      "./gifs/3.gif",
    ];
  }
  else if (levels.value === "2") {
    checkLevel = "2";
    COLORS = [
      "./gifs/1.gif",
      "./gifs/2.gif",
      "./gifs/3.gif",
      "./gifs/4.gif",
      "./gifs/1.gif",
      "./gifs/2.gif",
      "./gifs/3.gif",
      "./gifs/4.gif",
    ];
  }
  else {
    checkLevel = "3";
    COLORS = [
      "./gifs/1.gif",
      "./gifs/2.gif",
      "./gifs/3.gif",
      "./gifs/4.gif",
      "./gifs/5.gif",
      "./gifs/6.gif",
      "./gifs/7.gif",
      "./gifs/8.gif",
      "./gifs/1.gif",
      "./gifs/2.gif",
      "./gifs/3.gif",
      "./gifs/4.gif",
      "./gifs/5.gif",
      "./gifs/6.gif",
      "./gifs/7.gif",
      "./gifs/8.gif"];
  }
  let shuffledColors = shuffle(COLORS);
  mainPageContent.style.display = "none";
  game.style.display = "flex";
  moves.style.display = "block";
  moves.innerHTML = "Moves=0";
  restartButton.style.display = "block";
  restartButton.addEventListener("click", restartButtonClick);
  resetButton.style.display = "block";
  resetButton.addEventListener("click", resetButtonClick);
  createDivsForColors(shuffledColors);
});

function restartButtonClick(event) {

  // if ((colorArray.length == 3 && checkLevel == "1") || (colorArray.length == 4 && checkLevel == "2") || (colorArray.length == 8 && checkLevel == "3")) {
  location.reload();
  // }
}
function resetButtonClick(event) {
  // startButton.trigger("click");
  const winner = document.querySelector("#winner");
  winner.style.display = "none";
  console.log("reset 1");
  minMoves = 0;
  clickCount = 0;
  preClass = null;
  let game = document.querySelectorAll("#game div");
  let moves = document.querySelector(".moves");
  moves.innerHTML = "Moves= " + minMoves;
  // location.reload();
  console.log(game.length);

  for (let index = 0; index < game.length; index++) {
    console.log(game[index])
    game[index].style.backgroundImage = "none";
    game[index].style.backgroundImage = "linear-gradient(to right bottom, violet, blue, white)";
  }

}


// when the DOM loads


const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let startButton = document.querySelector("#startButton");
startButton.addEventListener('click', function (event) {
  let mainPageContent = document.querySelector("#mainPageContent");
  let game = document.querySelector("#game");
  let moves = document.querySelector(".moves");
  let restartButton = document.querySelector("#restartButton");
  mainPageContent.style.display = "none";
  game.style.display = "flex";
  moves.style.display = "block";
  moves.innerHTML = "Moves=0";
  restartButton.style.display = "block";
  restartButton.addEventListener("click", restartButtonClick);
});

function restartButtonClick(event) {
  if (colorArray.length == 5) {
    location.reload();
  }
}
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

let shuffledColors = shuffle(COLORS);

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
let preClass = null;
let colorArray = [];
let clickCount = 0;
let minMoves = 0;
function handleCardClick(event) {
  // you can use event.target to see which element was clicked  

  if (clickCount < 2 && preClass != event.target) {
    console.log("you clicked", event.target, preClass);
    event.target.classList.toggle("rotate");
    minMoves++;
    let moves = document.querySelector(".moves");
    moves.innerHTML = "Moves= " + minMoves;
    if (!preClass) {
      // if (!event.target.style.backgroundColor || event.target.style.backgroundColor == "white") {
      preClass = event.target;
      console.log(event.target.className.split(" ")[0]);
      event.target.style.backgroundColor = event.target.className.split(" ")[0];
      clickCount += 1;
      // }
    }
    else if (preClass.className.split(" ")[0] == event.target.className.split(" ")[0]) {
      event.target.style.backgroundColor = event.target.className.split(" ")[0];
      clickCount = 0;
      colorArray.push(event.target.className);
      event.target.removeEventListener("click", handleCardClick);
      preClass.removeEventListener("click", handleCardClick);
      preClass = null;
      if (colorArray.length == 5) {
        console.log(colorArray);
        let winner = document.querySelector("#winner");
        winner.style.display = "block";
        winner.innerHTML = `Winner<br/> Your Score ` + minMoves;
      }

    }
    else {
      event.target.style.backgroundColor = event.target.className.split(" ")[0];
      clickCount += 1;
      setTimeout(() => {
        event.target.style.backgroundColor = "white";
        preClass.style.backgroundColor = "white";
        preClass = null;
        clickCount = 0;
      }, 1000);
    }
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);

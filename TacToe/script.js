const CIRCLE_CLASS = "circle";
const X_CLASS = "x";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellEl = document.querySelectorAll("[data-cell]");
const messageEl = document.querySelector("[data-winning-text]");
const messageElDiv = document.querySelector(".winning-message");
const boardEl = document.getElementById("board");
const restartButton = document.getElementById("restartButton");
var intervalId = window.setInterval(function () {
  update();
}, 10);

let circleTurn;

startGame();
restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellEl.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();
  messageElDiv.classList.remove("show");
}
function update() {
  const hue = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--hue")
  );
  document.documentElement.style.setProperty("--hue", hue + 0.2);
}
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHover();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurn() {
  circleTurn = !circleTurn;
}
function setBoardHover() {
  boardEl.classList.remove(CIRCLE_CLASS);
  boardEl.classList.remove(X_CLASS);
  if (circleTurn) {
    boardEl.classList.add(CIRCLE_CLASS);
  } else {
    boardEl.classList.add(X_CLASS);
  }
}
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellEl[index].classList.contains(currentClass);
    });
  });
}
function endGame(draw) {
  if (draw) {
    messageEl.textContent = "Draw!";
  } else {
    messageEl.textContent = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  messageElDiv.classList.add("show");
}
function isDraw() {
  return [...cellEl].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function isDraw() {
  return [...cellEl].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

import { onSnake, expandSnake, snakeBody } from "./snakeScript.js";
import { randomPosition } from "./handleGridScript.js";
let food = getFoodPosition();
const EXPANSION_RATE = 2;
const scoreEl = document.getElementById("score");
export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    updateScore();
    playSwallow();
    food = getFoodPosition();
  }
}

export function draw(mainEl) {
  const foodEl = document.createElement("div");
  foodEl.style.gridColumnStart = food.x;
  foodEl.style.gridRowStart = food.y;
  foodEl.classList.add("food");
  mainEl.appendChild(foodEl);
}

function getFoodPosition() {
  let foodPosition;
  while (foodPosition == null || onSnake(foodPosition)) {
    foodPosition = randomPosition();
  }
  return foodPosition;
}
function playSwallow() {
  let audio = new Audio("./Audio/SNAKE_SWALLOW.mp3");
  audio.play();
}
function updateScore() {
  if (
    localStorage.getItem("score") < snakeBody.length ||
    localStorage.getItem("score") == null
  ) {
    scoreEl.textContent = "Best Result: ";
    scoreEl.textContent += snakeBody.length + 2;
    localStorage.setItem("score", snakeBody.length + 2);
  }
}

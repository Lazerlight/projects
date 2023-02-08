const mainEl = document.querySelector("main");
const crashScreen = document.querySelector(".crash-screen");
const crashButton = document.getElementById("crashButton");
const scoreEl = document.getElementById("score");
let score = localStorage.getItem("score");

scoreEl.textContent += score;
playMusic();
var intervalId = window.setInterval(function () {
  playMusic();
}, 9600);

import { update as updateFood, draw as drawFood } from "./foodScript.js";
import { outsideGrid } from "./handleGridScript.js";
import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getHead,
  snakeIntesection,
} from "./snakeScript.js";

let lastRenderTime = 0;
let gameOver = false;

crashButton.addEventListener("click", (e) => {
  window.location = "";
});
function renderGame(Time) {
  if (gameOver) {
    playCrash();
    crashScreen.classList.add("show");
    return;
  }

  const timeSinceLastRender = (Time - lastRenderTime) / 1000;
  window.requestAnimationFrame(renderGame);
  if (timeSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = Time;

  updateLoop();
  drawLoop();
}

window.requestAnimationFrame(renderGame);

function updateLoop() {
  updateSnake();
  updateFood();
  handleLose();
}

function drawLoop() {
  mainEl.innerHTML = "";
  drawSnake(mainEl);
  drawFood(mainEl);
}

function handleLose() {
  gameOver = outsideGrid(getHead()) || snakeIntesection();
}

function playCrash() {
  let audio = new Audio("./Audio/SNAKE_CRASH.mp3");
  audio.play();
}
function playMusic() {
  let audio = new Audio("./Audio/GAME_MUSIC.mp3");
  audio.play();
}

// Export Statements
export let warpSpeed = false;

// Import Statements
import { moveBackground, setupBackground, SPEED } from "./background.js";
import { movement } from "./player.js";
import { moveSpear, setupSpear } from "./spear.js";
import { moveWarp, setupWarp } from "./warp.js";

// Constant Variables leading to DOM elements
const playerEl = document.querySelector(".humanoid");
const spearEl = document.querySelectorAll(".spear");
const warpEl = document.querySelector(".warp");
const messageEl = document.querySelector(".starting-message");
const loseMessageEl = document.querySelector(".lose-message");
const buttonEl = document.querySelector("button");
const scoreEl = document.querySelector(".scoreEl");

// Variables helping with the functionality and checking for events
let currentScore = 0;
let lastTime;
let gameStarted = false;
let warpSpeedTimeout = 4000;

// Audio Files
let warpAudio = new Audio("./Audio/Time_Warp_Sound_Effect.mp3");
let ambientAudio = new Audio("./Audio/deep-space-ambiance.mp3");
let beepAudio = new Audio("./Audio/beepSound.mp3");
// Setting up the start main page elements
scoreEl.textContent = `Score: ${localStorage.getItem("score")}`;
setupBackground();
setupSpear();
setupWarp();

// Event Listeners
window.addEventListener(
  "keypress",
  function () {
    if (!gameStarted) {
      gameStarted = true;
      ambientAudio.play();
      messageEl.classList.add("hidden");
      renderGame();
    }
  },
  { once: true }
);
window.addEventListener(
  "click",
  () => {
    if (!gameStarted) {
      gameStarted = true;
      ambientAudio.play();
      messageEl.classList.add("hidden");
      renderGame();
    }
  },
  { once: true }
);
buttonEl.addEventListener("click", () => {
  window.location.reload();
});

// Functions
function renderGame(time) {
  // The main function that constantly updates the game and renders the elements
  if (gameStarted) {
    if (lastTime == null) {
      window.requestAnimationFrame(renderGame);
      lastTime = time;
      return;
    }
    const delta = time - lastTime;
    lastTime = time;
    movement(delta);
    moveBackground(delta);
    moveSpear(delta);
    moveWarp(delta);
    incScore(delta);
    if (hasCollided(playerEl, spearEl)) {
      gameStarted = false;
      beepAudio.play();
      ambientAudio.pause();
      loseMessageEl.classList.remove("hidden");
    }
    if (hasCollided(playerEl, warpEl)) {
      warpAudio.play();
      handleWarpSpeed();
    }
    window.requestAnimationFrame(renderGame);
  }
}

function hasCollided(a, b) {
  const rect1 = a.getBoundingClientRect();
  let collisionDetected = false;
  if (NodeList.prototype.isPrototypeOf(b)) {
    b.forEach((element) => {
      const rect2 = element.getBoundingClientRect();
      const collision = !(
        rect1.right < rect2.left + 15 ||
        rect1.left > rect2.right + 15 ||
        rect1.bottom < rect2.top - 15 ||
        rect1.top > rect2.bottom - 15
      );

      if (collision) {
        collisionDetected = true;
      }
    });
  } else {
    const rect2 = b.getBoundingClientRect();

    return !(
      rect1.right < rect2.left - 15 ||
      rect1.left > rect2.right - 15 ||
      rect1.bottom < rect2.top - 15 ||
      rect1.top > rect2.bottom - 15
    );
  }
  return collisionDetected;
}

function handleWarpSpeed() {
  warpSpeed = true;
  setTimeout(() => {
    warpSpeed = false;
  }, warpSpeedTimeout);
}

function incScore(delta) {
  currentScore += SPEED * 0.5;
  if (currentScore > localStorage.getItem("score")) {
    localStorage.setItem("score", Math.floor(currentScore));
    scoreEl.textContent = `Score: ${localStorage.getItem("score")}`;
  }
}

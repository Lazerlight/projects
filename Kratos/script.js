const MAIN_WIDTH = 200;
const MAIN_HEIGHT = 50;
let blurTab = false;
let INCREASE_SCALE = 0;
let INCREASE_SCORE = 0;
let SPEED_SCALE = 0;
let SCORE = 0;

import { renderGround, setupGround } from "./ground.js";
import { renderObstacle, setupObstacle, obstacleRect } from "./obstacle.js";
import { renderBat, setupBat, batRect } from "./bat.js";
import { renderSnake, setupSnake, snakeRect } from "./snake.js";
import {
  renderKratos,
  setupKratos,
  kratosRect,
  setKratosDead,
} from "./kratos.js";

const mainEl = document.querySelector("main");
const startMessageEl = document.querySelector(".start-message");
const scoreEl = document.querySelector(".score");
const topScoreEl = document.querySelector(".top-score");

setMainScale();
document.addEventListener("keydown", gameStart, { once: true });
document.addEventListener("touchstart", gameStart, { once: true });
window.addEventListener("resize", setMainScale);
function setMainScale() {
  let mainPixelScale;

  if (window.innerWidth / window.innerHeight < MAIN_WIDTH / MAIN_HEIGHT) {
    mainPixelScale = window.innerWidth / MAIN_WIDTH;
  } else {
    mainPixelScale = window.innerHeight / MAIN_HEIGHT;
  }

  mainEl.style.width = `${MAIN_WIDTH * mainPixelScale}px`;
  mainEl.style.height = `${MAIN_HEIGHT * mainPixelScale}px`;
}

let lastTime;
function renderGame(time) {
  if (!document.hidden || !document.webkitHidden) {
    if (lastTime == null) {
      lastTime = time;
      window.requestAnimationFrame(renderGame);
      return;
    }
    const delta = time - lastTime;
    renderGround(delta, SPEED_SCALE);
    renderKratos(delta, SPEED_SCALE);
    renderObstacle(delta, SPEED_SCALE);
    renderBat(delta, SPEED_SCALE);
    renderSnake(delta, SPEED_SCALE);
    incSpeed(delta);
    incScore(delta);
    calcTopScore();
    if (gameEnd(kratosRect()) || blurTab) return handleLose();
    lastTime = time;
    window.addEventListener("blur", checkTab, { once: true });
  }
  window.requestAnimationFrame(renderGame);
}
function checkTab() {
  INCREASE_SCORE = 0;
  blurTab = true;
}
window.requestAnimationFrame(renderGame);

function gameStart() {
  if (!document.hidden || !document.webkitHidden) {
    blurTab = false;
    lastTime = null;
    SPEED_SCALE = 0.5;
    INCREASE_SCALE = 0.000005;
    INCREASE_SCORE = 0.01;
    SCORE = 0;
    startMessageEl.classList.add("hide");
    setupGround();
    setupKratos();
    setupObstacle();
    setupBat();
    setupSnake();
  }
  window.requestAnimationFrame(renderGame);
}
function incSpeed(delta) {
  SPEED_SCALE += delta * INCREASE_SCALE;
}
function incScore(delta) {
  SCORE += delta * INCREASE_SCORE;
  scoreEl.textContent = Math.floor(SCORE);
}
function calcTopScore() {
  let topScore = localStorage.getItem("TopScore");
  if (topScore === null) {
    localStorage.setItem("TopScore", Math.floor(SCORE));
    return;
  }
  if (topScore < Math.floor(SCORE)) {
    localStorage.setItem("TopScore", Math.floor(SCORE));
    topScoreEl.textContent = `Top Score: ${topScore}`;
  }
  topScoreEl.textContent = `Top Score: ${topScore}`;
  console.log(Math.floor(topScore));
}
function gameEnd(kratosRect) {
  return (
    obstacleRect().some((rect) => isCollison(rect, kratosRect)) ||
    batRect().some((rect) => isCollison(rect, kratosRect)) ||
    snakeRect().some((rect) => isCollison(rect, kratosRect))
  );
}
function isCollison(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}
function handleLose() {
  startMessageEl.classList.remove("hide");
  playDeadAudio();
  setKratosDead();
  setTimeout(() => {
    document.addEventListener("keydown", gameStart, { once: true });
    document.addEventListener("touchstart", gameStart, { once: true });
  }, 1000);
}

function playDeadAudio() {
  const audio = new Audio("./Audio/kratosDead.mp3");
  audio.play();
}

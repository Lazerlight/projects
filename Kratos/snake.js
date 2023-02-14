import {
  getCustomProperty,
  incCustomProperty,
  setCustomProperty,
} from "./CustomFunctions.js";

const SPEED = 0.2;
const OBSTACLE_MIN_INTERVAL = 10000;
const OBSTACLE_MAX_INTERVAL = 20000;

let upcomingObstacleInterval;

const mainEl = document.querySelector("main");

export function renderSnake(delta, speedScale) {
  document.querySelectorAll(".snake").forEach((e) => {
    incCustomProperty(e, "--left", delta * speedScale * SPEED * -1);
    if (getCustomProperty(e, "--left") <= -100) {
      e.remove();
    }
  });
  if (upcomingObstacleInterval <= 0) {
    createSnake();
    upcomingObstacleInterval =
      randomNumberBetween(OBSTACLE_MIN_INTERVAL, OBSTACLE_MAX_INTERVAL) /
      speedScale;
  }
  upcomingObstacleInterval -= delta;
}

export function setupSnake() {
  upcomingObstacleInterval = OBSTACLE_MIN_INTERVAL;
  document.querySelectorAll(".snake").forEach((e) => {
    e.remove();
  });
}

export function snakeRect() {
  return [...document.querySelectorAll(".snake")].map((e) => {
    return e.getBoundingClientRect();
  });
}

function createSnake() {
  const Obstacle = document.createElement("img");
  Obstacle.src = "./Graphics/snake.png.crdownload";
  Obstacle.classList.add("snake");
  setCustomProperty(Obstacle, "--left", 100);
  mainEl.append(Obstacle);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

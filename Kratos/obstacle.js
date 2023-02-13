import {
  getCustomProperty,
  incCustomProperty,
  setCustomProperty,
} from "./CustomFunctions.js";

const SPEED = 0.05;
const OBSTACLE_MIN_INTERVAL = 2000;
const OBSTACLE_MAX_INTERVAL = 4000;

let upcomingObstacleInterval;

const mainEl = document.querySelector("main");

export function renderObstacle(delta, speedScale) {
  document.querySelectorAll(".obstacle").forEach((e) => {
    incCustomProperty(e, "--left", delta * speedScale * SPEED * -1);
    if (getCustomProperty(e, "--left") <= -100) {
      e.remove();
    }
  });
  if (upcomingObstacleInterval <= 0) {
    createObstacle();
    upcomingObstacleInterval =
      randomNumberBetween(OBSTACLE_MIN_INTERVAL, OBSTACLE_MAX_INTERVAL) /
      speedScale;
  }
  upcomingObstacleInterval -= delta;
}

export function setupObstacle() {
  upcomingObstacleInterval = OBSTACLE_MIN_INTERVAL;
  document.querySelectorAll(".obstacle").forEach((e) => {
    e.remove();
  });
}

export function obstacleRect() {
  return [...document.querySelectorAll(".obstacle")].map((e) => {
    return e.getBoundingClientRect();
  });
}

function createObstacle() {
  const Obstacle = document.createElement("img");
  Obstacle.src = "./Graphics/spike.png";
  Obstacle.classList.add("obstacle");
  setCustomProperty(Obstacle, "--left", 100);
  mainEl.append(Obstacle);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

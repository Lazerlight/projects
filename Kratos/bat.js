import {
  getCustomProperty,
  incCustomProperty,
  setCustomProperty,
} from "./CustomFunctions.js";

const SPEED = 0.15;
const OBSTACLE_MIN_INTERVAL = 6000;
const OBSTACLE_MAX_INTERVAL = 12000;

let upcomingObstacleInterval;

const mainEl = document.querySelector("main");

export function renderBat(delta, speedScale) {
  document.querySelectorAll(".bat").forEach((e) => {
    incCustomProperty(e, "--left", delta * speedScale * SPEED * -1);
    if (getCustomProperty(e, "--left") <= -100) {
      e.remove();
    }
  });
  if (upcomingObstacleInterval <= 0) {
    createBat();
    upcomingObstacleInterval =
      randomNumberBetween(OBSTACLE_MIN_INTERVAL, OBSTACLE_MAX_INTERVAL) /
      speedScale;
  }
  upcomingObstacleInterval -= delta;
}

export function setupBat() {
  upcomingObstacleInterval = OBSTACLE_MIN_INTERVAL;
  document.querySelectorAll(".bat").forEach((e) => {
    e.remove();
  });
}

export function batRect() {
  return [...document.querySelectorAll(".bat")].map((e) => {
    return e.getBoundingClientRect();
  });
}

function createBat() {
  const Obstacle = document.createElement("img");
  Obstacle.src = "./Graphics/bat.gif";
  Obstacle.classList.add("bat");
  setCustomProperty(Obstacle, "--left", 100);
  mainEl.append(Obstacle);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

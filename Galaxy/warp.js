import { incProperty, setProperty } from "./CustomFunctions.js";
import { SPEED } from "./spear.js";

const COOLDOWN = 1 * 30000; // n * 60000 ms = n minutes
const warpEl = document.querySelector(".warp");

export function setupWarp() {
  // Setting up the warp element's position and looping it over time
  setInterval(() => {
    setProperty(warpEl, "--top", getRandomPositionTop());
    warpEl.style.left = getRandomPositionLeft() + "%";
    setProperty(warpEl, "--top", getRandomPositionTop());
  }, COOLDOWN);
}

export function moveWarp(delta) {
  // Handling the warp movement
  incProperty(warpEl, "--top", SPEED * delta);
}

function getRandomPositionTop() {
  // Returning a random number between -100 - -300
  return Math.floor(Math.random() * -200 - 100);
}
function getRandomPositionLeft() {
  // Returning a random number between 1 - 100
  return Math.floor(Math.random() * 100 + 1);
}

import { getProperty, incProperty, setProperty } from "./CustomFunctions.js";

export let SPEED = 0.1;
const playerEl = document.querySelector(".humanoid");
const spearEls = document.querySelectorAll(".spear");

export function setupSpear(delta) {
  //  Creating and setting up the position of the spear element
  spearEls.forEach((e) => {
    e.style.left = getRandomPositionLeft() + "%";
    setProperty(e, "--top", getRandomPositionTop());
  });
}

let followingSpear = true;
export function moveSpear(delta) {
  // Handling the spear movement and position
  spearEls.forEach((e) => {
    incProperty(e, "--top", SPEED * delta);
    if (getProperty(e, "--top") >= 95 && followingSpear && SPEED <= 0.15) {
      e.style.left = getProperty(playerEl, "--left") + "%";
      followingSpear = false;
      setProperty(e, "--top", getRandomPositionTop());
      SPEED += SPEED * 0.001;
    } else if (getProperty(e, "--top") >= 95) {
      e.style.left = getRandomPositionLeft() + "%";
      setProperty(e, "--top", getRandomPositionTop());
      followingSpear = true;
    }
  });
}

function getRandomPositionLeft() {
  // Returning a random number between 1 - 100
  return Math.floor(Math.random() * 100 + 1);
}

function getRandomPositionTop() {
  // Returning a random number between -100 - -300
  return Math.floor(Math.random() * -200 - 100);
}

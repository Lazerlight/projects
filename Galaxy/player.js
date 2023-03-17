const FRAME_DELAY = 30;

import { getProperty, incProperty, setProperty } from "./CustomFunctions.js";
import { SPEED } from "./spear.js";
import { warpSpeed } from "./script.js";

const playerEl = document.querySelector(".humanoid");
const rightButton = document.querySelector(".right-button");
const leftButton = document.querySelector(".left-button");
const PLAYER_VELOCITY = {
  x: 0,
};

window.addEventListener("keydown", (e) => {
  // Checking if certain key is pressed and changes the direction of movement if the statement is correct
  if (e.key == "ArrowRight" || e.key == "d") {
    PLAYER_VELOCITY.x = 1;
  } else if (e.key == "ArrowLeft" || e.key == "a") {
    PLAYER_VELOCITY.x = -1;
  }
});

window.addEventListener("keyup", function () {
  // Checking if the key is no longer held down and stops the direction of movement
  PLAYER_VELOCITY.x = 0;
});

// Event listeners for mobile button controls
rightButton.addEventListener("touchstart", () => {
  PLAYER_VELOCITY.x = -1;
});
rightButton.addEventListener("touchend", () => {
  PLAYER_VELOCITY.x = 0;
});
leftButton.addEventListener("touchstart", () => {
  PLAYER_VELOCITY.x = 1;
});
leftButton.addEventListener("touchend", () => {
  PLAYER_VELOCITY.x = 0;
});

let currentFrame = 1;
let currentFrameDelay = 0;
export function movement(delta) {
  // A function that handles the range of motion and velocity of the main player element
  incProperty(playerEl, "--left", SPEED * delta * PLAYER_VELOCITY.x);

  if (getProperty(playerEl, "--left") <= 3) {
    setProperty(playerEl, "--left", 3);
  } else if (getProperty(playerEl, "--left") >= 97) {
    setProperty(playerEl, "--left", 97);
  }
  currentFrameDelay += 1;
  // Checking if frame delay is over, if yes => change frame[n]
  if (currentFrame === 1 && currentFrameDelay >= FRAME_DELAY && !warpSpeed) {
    currentFrame = 2;
    playerEl.style.backgroundImage = `url(./Graphics/SpaceShip${currentFrame}.png)`;
    currentFrameDelay = 0;
  } else if (currentFrameDelay >= FRAME_DELAY && !warpSpeed) {
    currentFrame = 1;
    playerEl.style.backgroundImage = `url(./Graphics/SpaceShip${currentFrame}.png)`;
    currentFrameDelay = 0;
  } else if (warpSpeed) {
    currentFrame = 3;
    playerEl.style.backgroundImage = `url(./Graphics/SpaceShip${currentFrame}.png)`;
    currentFrameDelay = 0;
  }
}

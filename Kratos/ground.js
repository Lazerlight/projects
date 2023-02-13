const SPEED = 0.05;
import {
  getCustomProperty,
  setCustomProperty,
  incCustomProperty,
} from "./CustomFunctions.js";

const groundEls = document.querySelectorAll(".ground");

export function setupGround() {
  setCustomProperty(groundEls[0], "--left", 0);
  setCustomProperty(groundEls[1], "--left", 300);
}
export function renderGround(delta, speedScale) {
  groundEls.forEach((e) => {
    incCustomProperty(e, "--left", delta * SPEED * speedScale * -1);

    if (getCustomProperty(e, "--left") <= -300) {
      incCustomProperty(e, "--left", 600);
    }
  });
}

const FRAME_DELAY = 100;
const JUMP_SPEED = 0.35;
const GRAVITY = 0.001;

let JUMP_VELOCITY = 0;
import {
  getCustomProperty,
  setCustomProperty,
  incCustomProperty,
} from "./CustomFunctions.js";

const kratosEl = document.querySelector(".kratos");

let isJumping;
let currentFrame;
let currentFrameDelay;

export function renderKratos(delta, speedScale) {
  kratosJump(delta);
  kratosRun(delta, speedScale);
}
export function setKratosDead() {
  kratosEl.src = "./Graphics/kratosDead.png";
}
export function setupKratos() {
  isJumping = false;
  currentFrame = 0;
  currentFrameDelay = 0;
  JUMP_VELOCITY = 0;
  setCustomProperty(kratosEl, "--bottom", 0);
  document.removeEventListener("keydown", jump);
  document.removeEventListener("touchstart", jumpMobile);
  document.addEventListener("keydown", jump);
  document.addEventListener("touchstart", jumpMobile);
}
export function kratosRect() {
  return kratosEl.getBoundingClientRect();
}
function kratosJump(delta) {
  if (!isJumping) return;

  incCustomProperty(kratosEl, "--bottom", JUMP_VELOCITY * delta);

  if (getCustomProperty(kratosEl, "--bottom") <= 0) {
    setCustomProperty(kratosEl, "--bottom", 0);
    isJumping = false;
  }
  JUMP_VELOCITY -= GRAVITY * delta;
}

function kratosRun(delta, speedScale) {
  if (isJumping) {
    kratosEl.src = "./Graphics/kratosStand.png";
    return;
  }

  if (currentFrameDelay >= FRAME_DELAY) {
    kratosEl.src = `./Graphics/kratosRun-${currentFrame}.png`;
    currentFrameDelay -= FRAME_DELAY;
    if (currentFrame == 1) {
      currentFrame = 0;
    } else {
      currentFrame = 1;
    }
  }
  currentFrameDelay += delta * speedScale;
}

function jump(e) {
  if (e.code !== "Space" || isJumping) return;

  JUMP_VELOCITY = JUMP_SPEED;
  isJumping = true;
  playJumpAudio();
}
function jumpMobile(e) {
  if (isJumping) return;
  JUMP_VELOCITY = JUMP_SPEED;
  isJumping = true;
  playJumpAudio();
}
function playJumpAudio() {
  const audio = new Audio("./Audio/kratosJump.mp3");
  audio.play();
}

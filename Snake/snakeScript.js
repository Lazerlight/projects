import { getInputDirection } from "./playerInput.js";

export const SNAKE_SPEED = 5;
export const snakeBody = [{ x: 16, y: 16 }];
let newSegments = 0;

export function update() {
  addSegment();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(mainEl) {
  snakeBody.forEach((segment) => {
    const snakeEl = document.createElement("div");
    snakeEl.style.gridColumnStart = segment.x;
    snakeEl.style.gridRowStart = segment.y;
    snakeEl.classList.add("snake");
    mainEl.appendChild(snakeEl);
  });
}

export function expandSnake(rate) {
  newSegments += rate;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) {
      return false;
    }
    return equalPositions(segment, position);
  });
}

export function getHead() {
  return snakeBody[0];
}

export function snakeIntesection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions(position1, position2) {
  return position1.x === position2.x && position1.y === position2.y;
}
function addSegment() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}

import Ball from "./ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

function update() {
  ball.update([playerPaddle.rect(), computerPaddle.rect()]);
  computerPaddle.update(ball.y);
  const hue = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--hue")
  );
  document.documentElement.style.setProperty("--hue", hue + 0.2);
  if (lost()) {
    handleLose();
  }

  window.requestAnimationFrame(update);
}

function lost() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
    ball.playScored();
  } else {
    computerScore.textContent = parseInt(computerScore.textContent) + 1;
    // ball.playScored();
  }
  ball.reset();
  computerPaddle.reset();
  ball.velocity = 0.5;
}

document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

document.addEventListener("touchmove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(update);

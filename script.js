const gameBoard = document.getElementById("game-board");
let x = 0;
let y = 0;

const snake = document.createElement("div");
snake.id = "snake";
snake.style.left = x + "px";
snake.style.top = y + "px";
gameBoard.appendChild(snake);

const moveSnake = () => {
  x += 10;
  snake.style.left = x + "px";
};

setInterval(moveSnake, 100);

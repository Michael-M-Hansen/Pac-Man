const PlayGame = require('./game.js');
const Board = require('./board.js');

const initiateGame = ctx => {
  const board = new Board(ctx);
  const game = new PlayGame(ctx);
  board.drawBorders(ctx);
  board.drawGrid(ctx);
  game.startGame();
}

document.addEventListener("DOMContentLoaded", () => {
  const myCanvas = document.getElementById("canvas");
  const ctx = myCanvas.getContext('2d');
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 540, 380);
  initiateGame(ctx);
});

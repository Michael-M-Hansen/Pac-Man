const PlayGame = require("./game.js");

const initiateGame = (ctx) => {
  const game = new PlayGame(ctx);
  game.startGame();
  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    game.handleKeydown(event);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const myCanvas = document.getElementById("canvas");
  const ctx = myCanvas.getContext("2d");
  initiateGame(ctx);
});

const PacMan = require('./pacman.js');
const Board = require('./board.js');
const Ghost = require('./ghost.js');

class PlayGame {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx);
    this.PacMan = new PacMan(ctx, [16, 14]);
    this.greenGhost = new Ghost(ctx, "ghost-green", [2, 14], "right", 280, 40);
    this.redGhost = new Ghost(ctx, "ghost-red", [2, 2], "down", 40, 40);
    this.pinkGhost = new Ghost(ctx, "ghost-pink", [12, 2], "left", 40, 240);
    this.yellowGhost = new Ghost(ctx, "ghost-yellow", [16, 24], "up", 480, 320);
    this.break = false;
    this.level = 1;
    this.keyMap = {37: "pacman-left", 38: "pacman-up", 39: "pacman-right", 40: "pacman-down"}
  }

  startGame() {
    this.board.drawBorders();
    this.board.drawFood();
    this.PacMan.setPacmanStart();
    this.greenGhost.setGhostStart();
    this.redrawCanvas();
  }

  handleKeydown(event) {
    if (this.keyMap[event.keyCode] === undefined) {
      return;
    }
    if (this.PacMan.inMotion) {
      this.PacMan.nextDirection = this.keyMap[event.keyCode];
    } else {
      this.PacMan.direction = this.keyMap[event.keyCode];
    }
    this.PacMan.break = false;
    this.PacMan.inMotion = true;
    this.PacMan.resetNextPos = true;
  }

  redrawCanvas() {
    if (this.PacMan.endGame) {
      this.PacMan.endGame = false;
      this.resetGame();
      return;
    }
    this.board.drawBorders();
    this.board.drawFood();
    this.PacMan.dispalyPlayerInfo();
    this.dispalyLevel();
    this.PacMan.drawPacman();
    this.greenGhost.drawGhost();
    this.redGhost.drawGhost();
    this.pinkGhost.drawGhost();
    this.yellowGhost.drawGhost();
    this.board.drawGrid();
    window.requestAnimationFrame(this.redrawCanvas.bind(this));
  }

  dispalyLevel() {
    this.ctx.font = "15px Arial";
    this.ctx.fillText(`Level ${this.level}`, 40, 217);
  }

  resetGame() {
    this.level += 1;
    this.board.resetGrid();
    this.redrawCanvas();
  }

}

module.exports = PlayGame;

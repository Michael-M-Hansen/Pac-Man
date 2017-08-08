const Character = require('./character.js');
const Board = require('./board.js');

class PlayGame {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx);
    this.PacMan = new Character(ctx, [16, 14]);
    this.break = false;
    this.level = 1;
    this.keyMap = {37: "pacman-left", 38: "pacman-up", 39: "pacman-right", 40: "pacman-down"}
  }

  startGame() {
    this.board.drawBorders();
    // this.board.drawGrid();
    this.board.drawFood();
    this.PacMan.setCharacterStart();
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
    // this.board.drawGrid();
    this.PacMan.drawCharacter();
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

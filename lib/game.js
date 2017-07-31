const PacMan = require('./pacman.js');
const Board = require('./board.js');

class PlayGame {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx);
    this.PacMan = new PacMan(ctx);
  }

  startGame() {
    this.board.drawBorders();
    this.board.drawGrid();
    this.board.drawFood();
    this.PacMan.setPacmanStart();
    this.redrawCanvas();
  }

  // handleKeydown(event) {
  //   console.log(event.keyCode);
  //   switch(event.keyCode) {
  //     case 37:
  //       this.PacMan.direction = "pacman-left";
  //     case 38:
  //       this.PacMan.direction = "pacman-up";
  //     case 39:
  //       this.PacMan.direction = "pacman-right";
  //     case 40:
  //       this.PacMan.direction = "pacman-down";
  //   }
  //   this.redrawCanvas();
  // }

  redrawCanvas() {
    if (this.PacMan.break === true) {
      this.PacMan.break = false;
      this.PacMan.resetPos = true;
      return;
    } else {
      this.board.drawBorders();
      this.board.drawFood();
      this.board.drawGrid();
    }
    this.PacMan.drawPacman();
    window.requestAnimationFrame(this.redrawCanvas.bind(this));
  }

}

module.exports = PlayGame;

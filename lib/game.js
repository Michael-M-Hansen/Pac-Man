const PacMan = require('./pacman.js');
const Board = require('./board.js');

class PlayGame {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx);
    this.PacMan = new PacMan(ctx);
    this.break = false;
    this.skiphandle = false;
  }

  startGame() {
    this.board.drawBorders();
    // this.board.drawGrid();
    this.board.drawFood();
    this.PacMan.setPacmanStart();
    // this.redrawCanvas();
  }

  handleKeydown(event) {
    //bug in the offset when moving early or late into a new direction
    if (event.keyCode === 37) {
      if (this.direction === "pacman-left") {
        this.skiphandle === true;
      } else {
        this.PacMan.direction = "pacman-left";
      }
    } else if (event.keyCode === 38) {
      if (this.direction === "pacman-up") {
        this.skiphandle === true;
      } else {
        this.PacMan.direction = "pacman-up";
       }
      //  }
    } else if (event.keyCode === 39) {
      if (this.direction === "pacman-right") {
        this.skiphandle === true;
      } else {
        this.PacMan.direction = "pacman-right";
       }
    } else if (event.keyCode === 40) {
      if (this.direction === "pacman-down") {
        this.skiphandle === true;
      } else {
        this.PacMan.direction = "pacman-down";
       }
    }

    if (this.skiphandle === false) {
      if (this.PacMan.canvasX % 20 !== 0) {
        this.handleCanvasX();
      } else if (this.PacMan.canvasY % 20 !== 0) {
        this.handleCanvasY();
      } else if (this.PacMan.canvasX % 20 === 0 && this.PacMan.canvasY % 20 === 0) {
        this.break === false;
      } else {
        this.break === true;
      }

      if (this.break) {
        this.break = false;
        return;
      }
    }

    this.skiphandle = false;
    this.redrawCanvas();
  }

  redrawCanvas() {
    if (this.PacMan.break === true) {
      this.PacMan.break = false;
      this.PacMan.resetPos = true;
      return;
    } else {
      this.board.drawBorders();
      this.board.drawFood();
      // this.board.drawGrid();
    }
    this.PacMan.drawPacman();
    window.requestAnimationFrame(this.redrawCanvas.bind(this));
  }
//fix offset for early moves
  handleCanvasX() {
    let { canvasX, positiveDirection, moveRange, counter, pos } = this.PacMan;
    let startPoint = pos[1] * 20;
    if ((positiveDirection) && startPoint > moveRange[0] && startPoint < moveRange[1]) {
      canvasX += (20 - canvasX % 20);
      counter = 20;
    } else if (!positiveDirection && (startPoint < moveRange[0]) && (startPoint > moveRange[1])) {
      canvasX -= canvasX % 20;
      counter = 20;
    }
    debugger;
  }

  //canvasY = [0]
  //canvasX = [1]
// fix offset for early moves
    handleCanvasY() {
      let { canvasY, positiveDirection, moveRange, counter, pos } = this.PacMan;
      let startPoint = pos[0] * 20;
      if (positiveDirection && startPoint > moveRange[0] && startPoint < moveRange[1]) {
        ccanvasY += (20 - canvasY % 20);
        counter = 20;
      } else if (!positiveDirection && (startPoint < moveRange[0]) && (startPoint > moveRange[1])) {
        canvasY -= canvasY % 20;
        counter = 20;
      }
      debugger;

    }



}

module.exports = PlayGame;

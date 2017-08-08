const grid = require("./grid.js");

class PacMan {
  constructor(ctx) {
    this.ctx = ctx;
    // this.oldDirection = null;
    this.direction = "pacman-up";
    this.nextDirection = null;
    this.pos = [16, 14];
    this.nextPos = [16, 14];
    this.points = 0;
    this.mode = "normal";
    this.counter = 0;
    this.imageX = 0;
    this.imageY = 0;
    this.canvasX = 280;
    this.canvasY = 320;
    this.resetPos = true;
    this.break = false;
    this.positiveDirection = null;
    this.moveRange = [];
  }

  setPacmanStart() {
    window.onload = () => {
      let image = document.getElementById(this.direction);
      this.ctx.drawImage(image, this.imageX, this.imageY, 20, 20, this.canvasX, this.canvasY,  20, 20);
    }
  }

  won() {

  }

  drawPacman() {
    this.setDirection();
    if (this.counter >= 20) {
      this.pos = this.nextPos;
      this.counter = 0;
      this.resetPos = true;
      if (this.nextDirection !== null) {
        this.direction = this.nextDirection;
        this.nextDirection = null;
      }
      if (this.canvasX % 20 !== 0) {
        debugger;
        this.canvasX = this.pos[1] * 20;
      } else if (this.canvasY % 20 !== 0) {
        debugger;
        this.canvasY = this.pos[0] * 20;
      }
    }

    if (this.counter <= 5) {
      this.imageX = 0;
    } else if (this.counter <= 10) {
      this.imageX = 20;
    } else if (this.counter <= 15) {
      this.imageX = 40;
    } else if (this.counter <= 20) {
      this.imageX = 60;
    }

    if (this.resetPos === true) {
      this.setNextPos();
      this.resetPos = false;
    }

    this.breakFromMove();
    if (this.break === true) {
      this.draw();
      return;
    }
    this.chooseDirection();
    this.counter += 2;
    this.draw();
  }

  setDirection() {
    if (this.direction === "pacman-up" || this.direction === "pacman-left") {
      this.positiveDirection = false;
    } else {
      this.positiveDirection = true;
    }
  }

  breakFromMove() {
    if (grid.map[this.nextPos[0]][this.nextPos[1]] === 3) {
        this.nextPos = this.pos;
        this.break = true;
    }
  }

  draw() {
    let image = document.getElementById(this.direction);
    this.ctx.drawImage(image, this.imageX, this.imageY, 20, 20, this.canvasX, this.canvasY,  20, 20);
  }

  chooseDirection() {
    if (this.direction === "pacman-up") {
      this.canvasY -= 1;
    } else if (this.direction === "pacman-down") {
      this.canvasY += 1;
    } else if (this.direction === "pacman-left") {
      this.canvasX -= 1;
    } else {
      this.canvasX += 1;
    }
  }

  setNextPos() {
    if (grid.map[this.pos[0]][this.pos[1]] === 0) {
      grid.map[this.pos[0]][this.pos[1]] = 1;
      this.points += 1;
    }
    let low, high;
    if (this.direction === "pacman-up") {
      this.nextPos = [this.pos[0] - 1, this.pos[1]];
      // low = ((this.pos[0] * 20) + 20) + 3;
      // high = ((this.pos[0] * 20) + 20) - 3;
      // this.moveRange = [low, high];
    } else if (this.direction === "pacman-down") {
      // this.nextPos = [this.pos[0] + 1, this.pos[1]];
      // low = ((this.pos[0] * 20) + 20) - 3;
      // high = ((this.pos[0] * 20) + 20) + 3;
      this.moveRange = [low, high];
    } else if (this.direction === "pacman-left") {
      this.nextPos = [this.pos[0], this.pos[1] - 1];
      // low = ((this.pos[1] * 20) + 20) + 3;
      // high = ((this.pos[1] * 20) + 20) - 3;
      // this.moveRange = [low, high];
    } else {
      this.nextPos = [this.pos[0], this.pos[1] + 1];
      // low = ((this.pos[1] * 20) + 20) - 3;
      // high = ((this.pos[1] * 20) + 20) + 3;
      // this.moveRange = [low, high];
    }
  }


}

//TEST FOR BRANCH UPDATE

module.exports = PacMan;

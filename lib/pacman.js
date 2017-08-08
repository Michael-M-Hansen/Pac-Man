const grid = require("./grid.js");

class PacMan {
  constructor(ctx) {
    this.ctx = ctx;
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
    this.resetNextPos = true;
    this.break = false;
    this.inMotion = false;
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
    if (this.inMotion) {
      if (this.counter >= 20) {
        this.pos = this.nextPos;
        this.counter = 0;
        this.resetNextPos = true;
        if (this.nextDirection !== null) {
          this.direction = this.nextDirection;
          this.nextDirection = null;
        }
      }

      if (this.resetNextPos) {
        this.setNextPos();
        this.resetNextPos = false;
      }
      this.breakFromMove();
      this.animatePacman();
        if (this.break) {
          this.draw();
          this.break = false;
          return;
        }

      this.chooseDirection();
      this.counter += 2;
      this.draw();
    } else {
      this.draw();
      return;
    }

  }

  breakFromMove() {
    if (grid.map[this.nextPos[0]][this.nextPos[1]] === 3 && this.counter === 0) {
        this.break = true;
        this.inMotion = false;
    }
  }

  draw() {
    let image = document.getElementById(this.direction);
    this.ctx.drawImage(image, this.imageX, this.imageY, 20, 20, this.canvasX, this.canvasY,  20, 20);
  }

  chooseDirection() {
    if (this.direction === "pacman-up") {
      this.canvasY -= 2;
    } else if (this.direction === "pacman-down") {
      this.canvasY += 2;
    } else if (this.direction === "pacman-left") {
      this.canvasX -= 2;
    } else {
      this.canvasX += 2;
    }
  }

  animatePacman() {
    if (this.counter <= 5) {
      this.imageX = 0;
    } else if (this.counter <= 10) {
      this.imageX = 20;
    } else if (this.counter <= 15) {
      this.imageX = 40;
    } else if (this.counter <= 20) {
      this.imageX = 60;
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
    } else if (this.direction === "pacman-down") {
      this.nextPos = [this.pos[0] + 1, this.pos[1]];
    } else if (this.direction === "pacman-left") {
      this.nextPos = [this.pos[0], this.pos[1] - 1];
    } else {
      this.nextPos = [this.pos[0], this.pos[1] + 1];
    }
  }


}


module.exports = PacMan;

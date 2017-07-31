const grid = require("./grid.js");

class PacMan {
  constructor(ctx, pos) {
    this.ctx = ctx;
    this.direction = "pacman-left";
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
  }

  setPacmanStart() {
    window.onload = () => {
      let image = document.getElementById(this.direction);
      this.ctx.drawImage(image, this.imageX, this.imageY, 20, 20, this.canvasX, this.canvasY,  20, 20);
    }
  }

  drawPacman() {
    if (this.counter >= 20) {
      this.pos = this.nextPos;
      this.counter = 0;
      this.resetPos = true;
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
      this.canvasY -= 2;
    } else if (this.direction === "pacman-down") {
      this.canvasY += 2;
    } else if (this.direction === "pacman-left") {
      this.canvasX -= 2;
    } else {
      this.canvasX += 2;
    }
  }

  setNextPos() {
    switch(this.direction) {
      case "pacman-up":
        this.nextPos = [this.pos[0] - 1, this.pos[1]];
      case "pacman-down":
        this.nextPos = [this.pos[0] + 1, this.pos[1]];
      case "pacman-left":
        this.nextPos = [this.pos[0], this.pos[1] - 1];
      case "pacman-right":
        this.nextPos = [this.pos[0], this.pos[1] + 1];
    }
  }


}

module.exports = PacMan;

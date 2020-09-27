const grid = require("./grid.js");

class PacMan {
  constructor(ctx, pos) {
    this.ctx = ctx;
    this.direction = "up";
    this.nextDirection = null;
    this.pos = pos;
    this.nextPos = pos;
    this.points = 0;
    this.lives = 3;
    this.totalPoints = 0;
    this.killMode = false;
    this.counter = 0;
    this.imageX = 0;
    this.imageY = 0;
    this.canvasX = 280;
    this.canvasY = 320;
    this.resetNextPos = true;
    this.break = false;
    this.inMotion = false;
    this.completedCurrentLevel = false;
    this.chompOverlap = 0;
    this.speed = 2;
  }

  setPacmanStart() {
    window.onload = () => {
      this.draw(this.direction);
    };
  }

  draw(selector) {
    let image = document.getElementById(selector);
    if (image) {
      this.ctx.drawImage(
        image,
        this.imageX,
        this.imageY,
        20,
        20,
        this.canvasX,
        this.canvasY,
        20,
        20
      );
    }
  }

  drawPacman() {
    if (this.inMotion) {
      this.checkCounter();
      this.checkForReset();
      this.breakFromMove();
      if (this.break) {
        this.breakFunc();
        return;
      }
      this.animatePacman();
      this.incrementPixelPosition();
      this.draw(this.direction);
      this.won();
      this.counter += 2;
    } else {
      this.draw(this.direction);
      this.won();
      return;
    }
  }

  checkCounter() {
    if (this.counter >= 20) {
      this.resetCounter();
    }
  }

  resetImageX() {
    if (this.imageX === 60) {
      this.imageX = 40;
    }
  }

  checkForReset() {
    if (this.resetNextPos) {
      this.setNextPos();
      this.eatFood();
      this.resetNextPos = false;
    }
  }

  breakFunc() {
    this.draw(this.direction);
    this.break = false;
    this.ghostStopped = true;
    this.resetImageX();
  }

  resetCounter() {
    this.pos = this.nextPos;
    this.counter = 0;
    this.resetNextPos = true;
    if (this.nextDirection !== null) {
      this.direction = this.nextDirection;
      this.nextDirection = null;
    }
  }

  breakFromMove() {
    if (
      grid.map[this.nextPos[0]][this.nextPos[1]] === 3 &&
      this.counter === 0
    ) {
      this.break = true;
      this.inMotion = false;
    }
  }

  won() {
    if (this.points >= 228) {
      this.completedCurrentLevel = true;
      this.totalPoints += this.points;
      this.points = 0;
      this.canvasX = 280;
      this.canvasY = 320;
      this.inMotion = false;
      this.pos = [16, 14];
      this.nextPos = [16, 14];
    }
  }

  incrementPixelPosition() {
    if (this.direction === "up") {
      this.canvasY -= this.speed;
    } else if (this.direction === "down") {
      this.canvasY += this.speed;
    } else if (this.direction === "left") {
      this.canvasX -= this.speed;
    } else {
      this.canvasX += this.speed;
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
    if (this.direction === "up") {
      this.nextPos = [this.pos[0] - 1, this.pos[1]];
    } else if (this.direction === "down") {
      this.nextPos = [this.pos[0] + 1, this.pos[1]];
    } else if (this.direction === "left") {
      this.nextPos = [this.pos[0], this.pos[1] - 1];
    } else {
      this.nextPos = [this.pos[0], this.pos[1] + 1];
    }
  }

  eatFood() {
    if (grid.map[this.pos[0]][this.pos[1]] === 0) {
      grid.map[this.pos[0]][this.pos[1]] = 1;
      this.points += 1;
    } else if (grid.map[this.pos[0]][this.pos[1]] === 9) {
      this.killMode = true;
      this.points += 10;
      grid.map[this.pos[0]][this.pos[1]] = 8;
      setTimeout(() => {
        this.mode = "normal";
      }, 8000);
    }
  }

  dispalyPlayerInfo() {
    this.ctx.font = "15px Arial";
    this.ctx.fillText(`Score ${this.points * 5}`, 40, 195);
    this.ctx.fillText(`Total Score ${this.totalPoints * 5}`, 40, 370);
    this.ctx.fillText(`Lives ${this.lives}`, 460, 370);
  }

  resetPacman() {
    this.direction = "up";
    this.nextDirection = null;
    this.pos = [16, 14];
    this.nextPos = [16, 14];
    this.killMode = false;
    this.counter = 0;
    this.imageX = 0;
    this.imageY = 0;
    this.canvasX = 280;
    this.canvasY = 320;
    this.resetNextPos = true;
    this.break = false;
    this.inMotion = false;
    this.completedCurrentLevel = false;
  }
}

module.exports = PacMan;

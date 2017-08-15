const grid = require('./grid.js');

class Ghost {

  constructor(ctx, id, pos, direction, canvasX, canvasY) {
    this.ctx = ctx;
    this.inMotion = true;
    this.direction = direction;
    this.id = id;
    this.pos = pos;
    this.nextPos = pos;
    this.imageX = 0;
    this.imageY = 0;
    this.canvasX = canvasX;
    this.canvasY = canvasY;
    this.counter = 0;
    this.speed = 1;
    this.resetNextPos = true;
    this.ghostDirections = ["left", "up", "right", "down"];
  }

  setGhostStart() {
    window.onload = () => {
      let image = document.getElementById(this.id);
      this.ctx.drawImage(image, this.imageX, this.imageY, 20, 20, this.canvasX, this.canvasY,  20, 20);
    }
  }

  draw() {
    let image = document.getElementById(this.id);
    this.ctx.drawImage(image, this.imageX, this.imageY, 20, 20, this.canvasX, this.canvasY,  20, 20);
  }

  goIntoKillMode() {
    let storeId = this.id;
    this.id = "ghost-kill-mode";
    setTimeout(() => {
      this.id = storeId;
    }, 8000)
  }

  drawGhost() {
    if (this.counter >= 20) {
      this.counter = 0;
      this.pos = this.nextPos;
      this.resetNextPos = true;
    }

    if (this.resetNextPos) {
      this.setNextPos();
      this.resetNextPos = false;
    }
    this.breakFromMove();
    if (this.break) {
      this.draw();
      this.break = false;
      this.inMotion = false;
      this.continueGhostMovement();
      this.resetNextPos = true;
      return;
    }
    if (this.inMotion) {
      this.incrementPixelPosition();
    } else {
      this.continueGhostMovement();
    }
    this.draw();
    this.counter += 1;
  }

  breakFromMove() {
    if (grid.map[this.nextPos[0]][this.nextPos[1]] === 3) {
        this.break = true;
        this.inMotion = false;
    }
  }

  incrementPixelPosition() {
    if (this.direction === "left") {
      this.canvasX -= this.speed;
      console.log(this.canvasX);
    } else if (this.direction === "right") {
      this.canvasX += this.speed;
      console.log(this.canvasX);
    } else if (this.direction === "up") {
      this.canvasY -= this.speed;
      console.log(this.canvasY);
    } else {
      this.canvasY += this.speed;
      console.log(this.canvasY);
    }
  }

  continueGhostMovement() {
    let idx = Math.floor(Math.random() * 4);
      this.direction = this.ghostDirections[idx];
      this.adjustImagePosition();
      this.inMotion = true;
  }

  adjustImagePosition() {
    if (this.direction === "up") {
      this.imageX = 60;
    } else if (this.direction === "down") {
      this.imageX = 20;
    } else if (this.direction === "left") {
      this.imageX = 40;
    } else {
      this.imageX = 0;
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

}

module.exports = Ghost;

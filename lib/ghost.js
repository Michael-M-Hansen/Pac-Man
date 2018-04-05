const grid = require('./grid.js');
const PacMan = require('./pacman.js');

class Ghost extends PacMan {

  constructor(ctx, id, pos, direction, canvasX, canvasY) {
    super();
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
    this.defaults = [id, pos, direction, canvasX, canvasY];
    this.resetNextPos = true;
    this.killMode = false;
    this.ghostDirections = ["left", "up", "right", "down"];
    this.storeId = null;
    this.changeDirect = false;
  }

  resetGhost() {
    this.inMotion = true;
    this.direction = this.defaults[2];
    this.id = this.defaults[0];
    this.pos = this.defaults[1];
    this.nextPos = this.defaults[0];
    this.imageX = 0;
    this.imageY = 0;
    this.canvasX = this.defaults[3];
    this.canvasY = this.defaults[4];
    this.killMode = false;
    this.counter = 0;
    this.resetNextPos = true;
  }

  goIntoKillMode() {
    if (this.id !== "ghost-kill-mode") {
      this.storeId = this.id;
    }
    this.killMode = true;
    this.changeDirect = true;
    this.id = "ghost-kill-mode";
    setTimeout(() => {
      this.id = this.storeId;
      this.killMode = false;
    }, 8000)
  }

  resetKillMode() {
    this.id = this.storeId;
  }

  drawGhost() {
    this.checkCounter();
    this.checkForReset();
    this.breakFromMove();
    if (this.break) {
      this.breakFunc();
      return;
    }
    this.checkForMotion();
    this.draw(this.id);
    this.counter += 1;
  }

  breakFunc() {
      this.draw(this.id);
      this.break = false;
      this.inMotion = false;
      this.continueGhostMovement();
      this.resetNextPos = true;
  }

  checkCounter() {
    if (this.counter >= 20) {
      this.counter = 0;
      this.pos = this.nextPos;
      this.resetNextPos = true;
      if (this.changeDirect) {
        this.changeDirection();
      }
    }
  }

  checkForReset() {
    if (this.resetNextPos) {
      this.setNextPos();
      this.resetNextPos = false;
    }
  }

  checkForMotion() {
    if (this.inMotion) {
      this.incrementPixelPosition();
    } else {
      this.continueGhostMovement();
    }
  }

  breakFromMove() {
    if (grid.map[this.nextPos[0]][this.nextPos[1]] === 3) {
        this.break = true;
        this.inMotion = false;
    }
  }

  changeDirection() {
    if (this.direction === "left") {
      this.direction = "right";
      this.changeDirect = false;
    } else if (this.direction === "right") {
      this.direction = "left";
      this.changeDirect = false;
    } else if (this.direction === "up") {
      this.direction = "down";
      this.changeDirect = false;
    } else if (this.direction === "down") {
      this.direction = "up";
      this.changeDirect = false;
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

  collidesWith(pos, nextPos) {
    let pacPos = pos.toString();
    let pacNextPos = nextPos.toString();
    let localPos = this.pos.toString();
    let localNextPos = this.nextPos.toString();
    if (localPos === pacPos || localNextPos === pacPos) {
      return true;
    }

    return false;
  }

}

module.exports = Ghost;

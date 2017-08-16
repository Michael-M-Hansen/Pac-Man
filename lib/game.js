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
    this.ghostReset = null;
    this.level = 1;
    this.lostLife = null;
    this.collidesWithTrigger = false;
    this.keyMap = {37: "pacman-left", 38: "pacman-up", 39: "pacman-right", 40: "pacman-down"};
  }

  startGame() {
    this.playIntroMusic();
    this.board.drawBorders();
    this.board.drawFood();
    this.PacMan.setPacmanStart();
  }

  playIntroMusic() {
    let music = document.getElementById("pacman-beginning");
    music.volume = 0.3;
    music.play();
  }

  gameOver() {
    if (this.PacMan.lives === 0) {
      this.PacMan.resetPacman();
      this.PacMan.lives = 3;
      this.PacMan.points = 0;
      this.PacMan.totalPoints = 0;
      this.board.resetGrid();
      this.level = 1;
      let gameOver = document.getElementById("game-over");
      gameOver.className = "game-over";
      setTimeout(() => {
        gameOver.className = "hidden";
        let newGame = document.getElementById("new-game");
        newGame.className = "new-game";
      }, 3000)
      return true;
    }
  }

  handleKeydown(event) {
    this.toggleClasses(event);
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

  toggleClasses(event) {
    if (event.keyCode === 78) {
      this.resetGame(false);
      this.redrawCanvas();
      let el = document.getElementById("new-game");
      el.className = "hidden";
      let nextLevelText = document.getElementById("next-level");
      nextLevelText.className = "hidden";
    }
  }

  redrawCanvas() {
    if (this.PacMan.endGame) {
      this.PacMan.endGame = false;
      this.resetGame();
      this.board.resetGrid();
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
    this.collidesWith();
    if (this.collidesWithTrigger) {
      this.collidesWithTrigger = false;
      return;
    }

    if (this.PacMan.killMode) {
      this.goIntoKillMode();
      this.PacMan.killMode = false;
    }
    let endGame = this.gameOver();
    if (endGame) {
      return;
    }
    window.requestAnimationFrame(this.redrawCanvas.bind(this));
  }

  goIntoKillMode() {
    this.greenGhost.goIntoKillMode();
    this.redGhost.goIntoKillMode();
    this.pinkGhost.goIntoKillMode();
    this.yellowGhost.goIntoKillMode();
  }

  dispalyLevel() {
    this.ctx.font = "15px Arial";
    this.ctx.fillText(`Level ${this.level}`, 40, 217);
  }

  resetGhostPositions() {
    this.greenGhost.resetGhost();
    this.redGhost.resetGhost();
    this.pinkGhost.resetGhost();
    this.yellowGhost.resetGhost();
  }

  collidesWith() {
    let collidesWithVar = false;
    let greenCollide = this.greenGhost.collidesWith(this.PacMan.pos, this.PacMan.nextPos);
    let redCollide = this.redGhost.collidesWith(this.PacMan.pos, this.PacMan.nextPos);
    let pinkCollide = this.pinkGhost.collidesWith(this.PacMan.pos, this.PacMan.nextPos);
    let yellowCollide = this.yellowGhost.collidesWith(this.PacMan.pos, this.PacMan.nextPos);
    if (greenCollide) {
      this.ghostReset = this.greenGhost;
      collidesWithVar = true;
    } else if (redCollide) {
      this.ghostReset = this.redGhost;
      collidesWithVar = true;
    } else if (pinkCollide) {
      this.ghostReset = this.pinkGhost;
      collidesWithVar = true;
    } else if (yellowCollide) {
      this.ghostReset = this.yellowGhost;
      collidesWithVar = true;
    }

    if (collidesWithVar) {
      this.collidesWithTrigger = true;
      this.handleCollision();
    }
  }

  handleCollision() {
    if (this.ghostReset.killMode) {
      this.ghostReset.resetGhost();
      this.collidesWithTrigger = false;
      this.eatingGhostSound();
    } else {
      this.deathSound();
      setTimeout(() => {
        this.resetGame(false);
        this.PacMan.resetPacman();
        this.redrawCanvas();
        this.PacMan.lives -= 1;
      }, 2000)
    }
  }

  deathSound() {
    let deathSound = document.getElementById('death-sound');
    deathSound.volume = 0.3;
    deathSound.play();
  }

  eatingGhostSound() {
    let eatingGhostSound = document.getElementById('eating-ghost-sound');
    eatingGhostSound.volume = 0.3;
    eatingGhostSound.play();
  }

  resetGame(levelUp = true) {
    // this.board.resetGrid();
    this.PacMan.setPacmanStart();
    this.redGhost.resetKillMode();
    this.yellowGhost.resetKillMode();
    this.pinkGhost.resetKillMode();
    this.greenGhost.resetKillMode();
    this.resetGhostPositions();
    if (levelUp) {
      this.level += 1;
      let nextLevelText = document.getElementById("next-level");
      nextLevelText.className = "next-level";
    }
  }

}

module.exports = PlayGame;

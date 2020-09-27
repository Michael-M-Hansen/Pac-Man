const PacMan = require("./pacman.js");
const Board = require("./board.js");
const Ghost = require("./ghost.js");
const Grid = require("./grid.js");

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
    this.userResetGame = false;
    this.level = 1;
    this.gameStarted = false;
    this.lostLife = null;
    this.collidesWithTrigger = false;
    this.keyMap = { 37: "left", 38: "up", 39: "right", 40: "down" };
  }

  startGame() {
    // initalize the game
    this.playIntroMusic();
    this.board.drawBorders();
    this.board.drawFood();
    this.PacMan.setPacmanStart();
    this.setWelcomeMessage();
    this.setResetEventHandler();
  }

  setWelcomeMessage() {
    const newGame = document.getElementById("new-game");
    newGame.className = "new-game";
  }

  playIntroMusic() {
    // play intro song when user initially enters the game
    const music = document.getElementById("pacman-beginning");
    music.volume = 0.3;
    music.play();
  }

  setResetEventHandler() {
    // user clicked the reset game button. Set PacMan lives to 0 to trigger a game reset.
    const resetButton = document.getElementById("user-reset");
    resetButton.addEventListener("click", () => {
      this.PacMan.lives = 0;
    });
  }

  gameOver() {
    // the user has lost or decided to reset the game so everything needs to be reset
    const { PacMan } = this;
    this.gameStarted = false;
    this.silenceSiren();
    PacMan.resetPacman();
    PacMan.lives = 3;
    PacMan.points = 0;
    PacMan.totalPoints = 0;
    this.board.resetGrid();
    this.level = 1;
    const resetGame = document.getElementById("game-over");
    resetGame.className = "game-over";
    setTimeout(() => {
      resetGame.className = "hidden";
      const newGame = document.getElementById("new-game");
      newGame.className = "new-game";
    }, 3000);
    return true;
  }

  handleKeydown(event) {
    // receive the keydown event from users input and process for movement, new game or continue game
    const { PacMan } = this;
    if (!this.gameStarted) {
      this.triggerAnimation(event.keyCode);
    }
    this.gameStarted = true;
    if (this.keyMap[event.keyCode] === undefined) {
      return;
    }
    if (PacMan.inMotion) {
      // set pacmans next position becasue have to wait till current iteration of movement ends
      PacMan.nextDirection = this.keyMap[event.keyCode];
    } else {
      // set current direction to keydown event because pacman isn't in motion
      PacMan.direction = this.keyMap[event.keyCode];
    }
    PacMan.break = false;
    PacMan.inMotion = true;
    PacMan.resetNextPos = true;
  }

  triggerAnimation(keycode) {
    if (keycode === 78 || keycode === 67) {
      // hide all game info text after user makes selection to start playing
      this.resetGame();
      this.redrawCanvas();
      const newGameElement = document.getElementById("new-game");
      newGameElement.className = "hidden";
      const nextLevelText = document.getElementById("next-level");
      nextLevelText.className = "hidden";
    }
  }

  redrawCanvas() {
    const { PacMan } = this;
    if (PacMan.completedCurrentLevel) {
      this.level++;
      this.gameStarted = false;
      this.silenceSiren();
      this.resetGame();
      this.board.resetGrid();
      return;
    }
    this.board.drawBorders();
    this.board.drawFood();
    PacMan.dispalyPlayerInfo();
    this.dispalyLevel();
    PacMan.drawPacman();
    this.greenGhost.drawGhost();
    this.redGhost.drawGhost();
    this.pinkGhost.drawGhost();
    this.yellowGhost.drawGhost();
    this.collidesWith();
    if (this.collidesWithTrigger) {
      this.collidesWithTrigger = false;
      return;
    }

    if (PacMan.killMode) {
      this.goIntoKillMode();
      PacMan.killMode = false;
    }
    if (PacMan.lives <= 0) {
      this.gameOver();
      return;
    }
    window.requestAnimationFrame(this.redrawCanvas.bind(this));
  }

  goIntoKillMode() {
    // User has eaten a large white do so ghosts will turn blue and be vulnerabel to user
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
    const greenCollide = this.greenGhost.collidesWith(
      this.PacMan.pos,
      this.PacMan.nextPos
    );
    const redCollide = this.redGhost.collidesWith(
      this.PacMan.pos,
      this.PacMan.nextPos
    );
    const pinkCollide = this.pinkGhost.collidesWith(
      this.PacMan.pos,
      this.PacMan.nextPos
    );
    const yellowCollide = this.yellowGhost.collidesWith(
      this.PacMan.pos,
      this.PacMan.nextPos
    );
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
        this.PacMan.resetPacman();
        this.resetGhostPositions();
        this.redrawCanvas();
        this.PacMan.lives -= 1;
      }, 2000);
    }
  }

  silenceSiren() {
    const siren = document.getElementById("siren");
    siren.volume = 0;
  }

  deathSound() {
    const deathSound = document.getElementById("death-sound");
    deathSound.volume = 0.3;
    deathSound.play();
  }

  eatingGhostSound() {
    const eatingGhostSound = document.getElementById("eating-ghost-sound");
    eatingGhostSound.volume = 0.3;
    eatingGhostSound.play();
  }

  resetGame() {
    this.PacMan.draw();
    this.redGhost.resetKillMode();
    this.yellowGhost.resetKillMode();
    this.pinkGhost.resetKillMode();
    this.greenGhost.resetKillMode();
    this.resetGhostPositions();
    this.PacMan.completedCurrentLevel = false;
    const nextLevelText = document.getElementById("next-level");
    nextLevelText.className = "next-level";
  }
}

module.exports = PlayGame;

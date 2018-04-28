const PacMan = require('./pacman.js');
const Board = require('./board.js');
const Ghost = require('./ghost.js');
const Grid = require('./grid.js');

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
    this.userReset = false;
    this.level = 1;
    this.gameStarted = false;
    this.lostLife = null;
    this.collidesWithTrigger = false;
    this.keyMap = {37: "left", 38: "up", 39: "right", 40: "down"};
  }

  startGame() {
    // initalize the game
    this.playIntroMusic();
    this.board.drawBorders();
    this.board.drawFood();
    this.PacMan.setPacmanStart();
    this.setWelcomeMessage();
    this.setResetEventHandler();
    this.setExitForStorage(this.PacMan, this);
    if (window.localStorage["set"] === undefined || window.localStorage["set"] === "false") {
      this.setLocalStorage();
    } else {
      this.checkLocalStorage();
    }
  }

  setWelcomeMessage() {
    // set welcome message based on if there is a saved game in local storage
    if (window.localStorage["set"] === "true") {
      let cont = document.getElementById("continue-game");
      cont.className = "continue-game";
    } else {
      let el = document.getElementById("new-game");
      el.className = "new-game";
    }
  }

  setExitForStorage(PacMan, PlayGame) {
    // set all the current values to local storage when user is closing browser tab
    window.onbeforeunload = function(){
      window.localStorage["level"] = PlayGame.level;
      window.localStorage["lives"] = PacMan.lives;
      window.localStorage["points"] = PacMan.points;
      window.localStorage["totalPoints"] = PacMan.totalPoints;
      window.localStorage["map"] = JSON.stringify(Grid.map);
    }
  }

  setLocalStorage() {
    // this is the users first game so need to set initial values for local storage
    window.localStorage["set"] = true;
    window.localStorage["level"] = 1;
    window.localStorage["lives"] = 3;
    window.localStorage["points"] = 0;
    window.localStorage["totalPoints"] = 0;
    window.localStorage["map"] = false;
  }

  playIntroMusic() {
    // play intro song when user initially enters the game
    let music = document.getElementById("pacman-beginning");
    music.volume = 0.3;
    music.play();
  }

  checkLocalStorage() {
    // check all the local storage values to see if they need to be updated
    if (JSON.parse(window.localStorage["level"]) > 1) {
      this.level = JSON.parse(window.localStorage["level"]);
    }
    if (JSON.parse(window.localStorage["points"]) > 0) {
      this.PacMan.points = JSON.parse(window.localStorage["points"]);
    }
    if (JSON.parse(window.localStorage["totalPoints"]) > 0) {
      this.PacMan.totalPoints = JSON.parse(window.localStorage["totalPoints"]);
    }
    if (JSON.parse(window.localStorage["lives"]) != 3) {
      this.PacMan.lives = JSON.parse(window.localStorage["lives"]);
    }
    if (window.localStorage["map"] !== "false") {
      Grid.map = JSON.parse(window.localStorage["map"]);
    }
  }

  setResetEventHandler() {
    // add click event handler for reset game button
    let reset = document.getElementById("user-reset");
    reset.addEventListener("click", () => {
      let continueWecome = document.getElementById("continue-game");
      let newWelcome = document.getElementById("new-game");
      let nextWelcome = document.getElementById("next-level");
      let gameOver = document.getElementById("game-over");
      gameOver.className = "hidden";
      continueWecome.className = "hidden";
      newWelcome.className = "hidden";
      nextWelcome.className = "hidden";
      this.PacMan.lives = 0;
      this.userReset = true;
      if (!this.gameStarted || !this.PacMan.inMotion) {
        this.redrawCanvas();
      }
    });
  }

  gameOver() {
    // the user has lost or decided to reset the game so everything needs to be reset
    if (this.PacMan.lives === 0) {
      this.gameStarted = false;
      this.setLocalStorage();
      this.silenceSiren();
      this.PacMan.resetPacman();
      this.PacMan.lives = 3;
      this.PacMan.points = 0;
      this.PacMan.totalPoints = 0;
      this.board.resetGrid();
      this.level = 1;
      let selector;
      if (this.userReset) {
        // user chose to reset
        selector = "restarting-game"
      } else {
        // user lost game
        selector = "game-over";
      }
      this.userReset = false;
      let resetGame = document.getElementById(selector);
      resetGame.className = selector;
      setTimeout(() => {
        resetGame.className = "hidden";
        let newGame = document.getElementById("new-game");
        newGame.className = "new-game";
      }, 3000)
      return true;
    }
  }

  handleKeydown(event) {
    // receive the keydown event from users input and process for movement, new game or continue game
    this.toggleClasses(event);
    this.gameStarted = true;
    if (this.keyMap[event.keyCode] === undefined) {
      return;
    }
    if (this.PacMan.inMotion) {
      // set pacmans next position becasue have to wait till current iteration of movement ends
      this.PacMan.nextDirection = this.keyMap[event.keyCode];
    } else {
      // set current direction to keydown event because pacman isn't in motion
      this.PacMan.direction = this.keyMap[event.keyCode];
    }
    this.PacMan.break = false;
    this.PacMan.inMotion = true;
    this.PacMan.resetNextPos = true;
  }

  toggleClasses(event) {
    //if game is currently in play then don't accept n and c key values
    if (this.gameStarted) { return; };
    if (event.keyCode === 78 || event.keyCode === 67) {
      // hide all game info text after user makes selection to start playing
      this.resetGame(false);
      this.redrawCanvas();
      let el = document.getElementById("new-game");
      el.className = "hidden";
      let cont = document.getElementById("continue-game");
      cont.className = "hidden";
      let nextLevelText = document.getElementById("next-level");
      nextLevelText.className = "hidden";
    }
  }

  redrawCanvas() {
    if (this.PacMan.endGame) {
      // if the game is over because pac-man ate all dots or lives are 0 then trigger the game reset
      this.silenceSiren();
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

  silenceSiren() {
    let siren = document.getElementById('siren');
    siren.volume = 0;
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
    this.PacMan.draw();
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

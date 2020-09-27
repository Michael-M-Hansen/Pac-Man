/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Grid = __webpack_require__(/*! ./grid.js */ "./lib/grid.js");

class Board {

  constructor(ctx) {
    this.ctx = ctx;
  }

  drawBorders() {
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0, 0, 540, 380);
  this.ctx.strokeStyle = "#0033FF";
  this.ctx.lineCap = "round";
  this.ctx.lineWidth = 5;
  for (let i = 0; i < Grid.drawBoarders.length; i ++) {
   let currentLine = Grid.drawBoarders[i];
    this.ctx.beginPath();
    for (let j = 0; j < currentLine.length; j ++) {
      let pos = currentLine[j];
      if (pos.move) {
        this.ctx.moveTo(pos.move[0], pos.move[1]);
      } else if (pos.line) {
        this.ctx.lineTo(pos.line[0], pos.line[1]);
      } else if (pos.curve) {
        this.ctx.quadraticCurveTo(pos.curve[0], pos.curve[1],
          pos.curve[2], pos.curve[3]
        );
      }
    }
    this.ctx.stroke();
  }
};

drawFood() {
  for (let i = 0; i < 19; i ++) {
    for(let j = 0; j < 27; j++ ) {
      if (Grid.map[i][j] === 0 ) {
        let centerX = (i * 20) + 10;
        let centerY = (j * 20) + 10;
        this.ctx.beginPath();
        this.ctx.arc(centerY, centerX, 2, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
      } else if (Grid.map[i][j] === 9) {
        let centerX = (i * 20) + 10;
        let centerY = (j * 20) + 10;
        this.ctx.beginPath();
        this.ctx.arc(centerY, centerX, 5, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
      }
    }
  }

}

drawGrid() {
this.ctx.strokeStyle = "red";
this.ctx.lineCap = "round";
this.ctx.lineWidth = 1;
for (let i = 0; i < Grid.drawGrid.length; i ++) {
 let currentLine = Grid.drawGrid[i];
  this.ctx.beginPath();
  for (let j = 0; j < currentLine.length; j ++) {
    let pos = currentLine[j];
    if (pos.move) {
      this.ctx.moveTo(pos.move[0], pos.move[1]);
    } else if (pos.line) {
      this.ctx.lineTo(pos.line[0], pos.line[1]);
    } else if (pos.curve) {
      this.ctx.quadraticCurveTo(pos.curve[0], pos.curve[1],
        pos.curve[2], pos.curve[3]
      );
    }
  }
  this.ctx.stroke();
}
};

resetGrid() {
  for (let i = 0; i < 19; i ++) {
    for(let j = 0; j < 27; j++ ) {
      if (Grid.map[i][j] === 1 ) {
        Grid.map[i][j] = 0;
      } else if (Grid.map[i][j] === 8) {
        Grid.map[i][j] = 9;
      }
    }
  }
};

}

module.exports = Board;


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const PacMan = __webpack_require__(/*! ./pacman.js */ "./lib/pacman.js");
const Board = __webpack_require__(/*! ./board.js */ "./lib/board.js");
const Ghost = __webpack_require__(/*! ./ghost.js */ "./lib/ghost.js");
const Grid = __webpack_require__(/*! ./grid.js */ "./lib/grid.js");

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


/***/ }),

/***/ "./lib/ghost.js":
/*!**********************!*\
  !*** ./lib/ghost.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const grid = __webpack_require__(/*! ./grid.js */ "./lib/grid.js");
const PacMan = __webpack_require__(/*! ./pacman.js */ "./lib/pacman.js");

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


/***/ }),

/***/ "./lib/grid.js":
/*!*********************!*\
  !*** ./lib/grid.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const Grid = {
  empty: 1,
  smallFood: 0,
  largeFood: 9,
  wall: 3,
  map: [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 3, 3],
    [3, 3, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 0, 3, 3],
    [3, 3, 0, 3, 3, 3, 3, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 3],
    [3, 3, 0, 3, 3, 3, 3, 0, 3, 3, 0, 3, 0, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3],
    [3, 3, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
    [3, 3, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 3, 3, 3, 0, 3, 0, 3, 0, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 0, 3, 3, 3, 3, 0, 3, 0, 3, 0, 3, 3],
    [3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 3],
    [3, 3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 0, 3, 3],
    [3, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 3, 3],
    [3, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 3, 3, 0, 3, 3],
    [3, 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ],


  drawBoarders: [
    [
      // outside border
      { "move": [270, 110] },
      { "line": [270, 60] },
      { "curve": [270, 30, 240, 30] },
      { "line": [60, 30] },
      { "move": [270, 60] },
      { "curve": [270, 30, 300, 30] },
      { "line": [480, 30] },
      { "curve": [510, 30, 510, 60] },
      { "line": [510, 120] },
      { "curve": [510, 140, 530, 140] },
      { "move": [270, 270] },
      { "line": [270, 320] },
      { "curve": [270, 350, 240, 350] },
      { "line": [60, 350] },
      { "curve": [30, 350, 30, 320] },
      { "line": [30, 260] },
      { "curve": [30, 230, 60, 230]},
      { "line": [120, 230] },
      { "curve": [130, 230, 130, 220] },
      {"line": [130, 180]},
      { "curve": [130, 170, 120, 170] },
      { "line": [60, 170]},
      { "curve": [30, 170, 30, 140]},
      { "line": [30, 60] },
      { "curve": [30, 30, 60, 30]},
      { "move": [270, 320] },
      { "curve": [270, 350, 300, 350] },
      { "line": [480, 350] },
      { "curve": [510, 350, 510, 320]},
      { "line": [510, 260] },
      { "curve": [510, 240, 530, 240] }
    ],
    //top right rectangle
    [
      { "move": [390, 70] },
      { "line": [390, 100] },
      { "curve": [390, 110, 400, 110] },
      { "line": [470, 110]},
      { "move": [390, 100] },
      { "curve": [390, 110, 380, 110] },
      { "line": [310, 110]}
],

[
  { "move": [430, 70] },
  { "line": [470, 70] },
  { "move": [310, 70] },
  { "line": [350, 70] }
],



[
  {"move": [70, 120] },
  {"line": [70, 80] },
  { "move": [170, 70] },
  { "line": [220, 70] },
  {"curve": [230, 70, 230, 80] },
  {"line": [230, 110]},
  {"move": [190, 110] },
  {"line": [170, 110]}
],

[
  {"move": [130, 130] },
  {"line": [130, 80]},
  {"curve": [130, 70, 120, 70]},
  {"line": [80, 70] },
  { "curve": [70, 70, 70, 80]},
  {"move": [70, 130] },
  {"line": [120, 130] }
],
    //center rectangle

    [
      { "move": [270, 150] },
      { "curve": [250, 150, 250, 170] },
      { "line": [250, 210] },
      { "curve": [250, 230, 270, 230] },
      { "curve": [290, 230, 290, 210] },
      { "line": [290, 170] },
      { "curve": [290, 150, 270, 150] }
    ],

    [
      {"move": [310, 270] },
      { "line": [310, 300] },
      { "curve": [310, 310, 320, 310] },
      { "line": [350, 310] }
    ],

    [
      {"move": [350, 270] },
      { "line": [380, 270]},
      { "curve": [390, 270, 390, 280] },
      { "line": [390, 310] }
    ],

    [
      {"move": [230, 270]},
      {"line": [230, 300]},
      { "curve": [230, 310, 220, 310] },
      { "line": [190, 310] }
    ],

    [
      {"move": [70, 270] },
      { "line": [70, 300] },
      { "curve": [70, 310, 80, 310] },
      { "line": [110, 310]}
    ],

    [
      {"move": [110, 270] },
      { "line": [140, 270] },
      { "curve": [150, 270, 150, 280] },
      { "line": [150, 310]}
    ],

    [
      {"move": [190, 270] },
      { "line": [190, 240] },
      { "curve": [190, 230, 180, 230] },
      { "curve": [170, 230, 170, 220] },
      { "line": [170, 150] },
      {"move": [180, 230] },
      {"line": [210, 230] }
    ],

    [
      {"move": [210, 150] },
      { "line": [210, 190] },
    ],

    [
      {"move": [430, 310] },
      { "line": [460, 310] },
      { "curve": [470, 310, 470, 300] },
      { "line": [470, 150]}
    ],

    [
      { "move": [330, 150] },
      { "line": [420, 150] },
      { "curve": [430, 150, 430, 160] },
      { "line": [430, 270]}
    ],

    [
      {"move": [330, 190] },
      {"line": [380, 190]},
      { "curve": [390, 190, 390, 200] },
      { "line": [390, 220] },
      { "curve": [390, 230, 380, 230] },
      {"line": [330, 230]}
    ]




  ],

  drawGrid: [
    [
      {"move": [0, 0]},
      {"line": [0, 380]},

      {"move": [20, 0]},
      {"line": [20, 380]},

      {"move": [40, 0]},
        {"line": [40, 380]},

        {"move": [60, 0]},
        {"line": [60, 380]},

        {"move": [80, 0]},
        {"line": [80, 380]},

        {"move": [100, 0]},
        {"line": [100, 380]},

        {"move": [120, 0]},
        {"line": [120, 380]},

        {"move": [140, 0]},
        {"line": [140, 380]},

        {"move": [160, 0]},
        {"line": [160, 380]},

        {"move": [180, 0]},
        {"line": [180, 380]},

        {"move": [200, 0]},
        {"line": [200, 380]},

        {"move": [200, 0]},
        {"line": [200, 380]},

        {"move": [200, 0]},
        {"line": [200, 380]},

        {"move": [220, 0]},
        {"line": [220, 380]},

        {"move": [240, 0]},
        {"line": [240, 380]},

        {"move": [260, 0]},
        {"line": [260, 380]},

        {"move": [280, 0]},
        {"line": [280, 380]},

        {"move": [300, 0]},
        {"line": [300, 380]},

        {"move": [320, 0]},
        {"line": [320, 380]},

        {"move": [340, 0]},
        {"line": [340, 380]},

        {"move": [360, 0]},
        {"line": [360, 380]},

        {"move": [380, 0]},
        {"line": [380, 380]},

        {"move": [400, 0]},
        {"line": [400, 380]},

        {"move": [420, 0]},
        {"line": [420, 380]},

        {"move": [440, 0]},
        {"line": [440, 380]},

        {"move": [460, 0]},
        {"line": [460, 380]},

        {"move": [480, 0]},
        {"line": [480, 380]},

        {"move": [500, 0]},
        {"line": [500, 380]},

        {"move": [520, 0]},
        {"line": [520, 380]},

        {"move": [0, 20]},
        {"line": [540, 20]},

        {"move": [0, 40]},
        {"line": [540, 40]},

        {"move": [0, 60]},
        {"line": [540, 60]},

        {"move": [0, 80]},
        {"line": [540, 80]},

        {"move": [0, 100]},
        {"line": [540, 100]},

        {"move": [0, 120]},
        {"line": [540, 120]},

        {"move": [0, 140]},
        {"line": [540, 140]},

        {"move": [0, 160]},
        {"line": [540, 160]},

        {"move": [0, 180]},
        {"line": [540, 180]},

        {"move": [0, 200]},
        {"line": [540, 200]},

        {"move": [0, 220]},
        {"line": [540, 220]},

        {"move": [0, 240]},
        {"line": [540, 240]},

        {"move": [0, 260]},
        {"line": [540, 260]},

        {"move": [0, 280]},
        {"line": [540, 280]},

        {"move": [0, 300]},
        {"line": [540, 300]},

        {"move": [0, 320]},
        {"line": [540, 320]},

        {"move": [0, 340]},
        {"line": [540, 340]},

        {"move": [0, 360]},
        {"line": [540, 360]},

        {"move": [0, 380]},
        {"line": [540, 380]}

    ]
  ]
};

module.exports = Grid;


/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const PlayGame = __webpack_require__(/*! ./game.js */ "./lib/game.js");

const initiateGame = (ctx) => {
  const game = new PlayGame(ctx);
  game.startGame();
  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    game.handleKeydown(event);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const myCanvas = document.getElementById("canvas");
  const ctx = myCanvas.getContext("2d");
  initiateGame(ctx);
});


/***/ }),

/***/ "./lib/pacman.js":
/*!***********************!*\
  !*** ./lib/pacman.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const grid = __webpack_require__(/*! ./grid.js */ "./lib/grid.js");

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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
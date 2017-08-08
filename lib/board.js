const Grid = require('./grid.js');

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

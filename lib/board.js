const Grid = require('./grid.js');

class Board {

  constructor(ctx, grid) {
    this.ctx = ctx;
  }

  drawBorders(ctx) {
  ctx.strokeStyle = "#0033FF";
  ctx.lineCap = "round";
  ctx.lineWidth = 5;
  for (let i = 0; i < Grid.drawBoarders.length; i ++) {
   let currentLine = Grid.drawBoarders[i];
    ctx.beginPath();
    for (let j = 0; j < currentLine.length; j ++) {
      let pos = currentLine[j];
      if (pos.move) {
        ctx.moveTo(pos.move[0], pos.move[1]);
      } else if (pos.line) {
        ctx.lineTo(pos.line[0], pos.line[1]);
      } else if (pos.curve) {
        ctx.quadraticCurveTo(pos.curve[0], pos.curve[1],
          pos.curve[2], pos.curve[3]
        );
      }
    }
    ctx.stroke();
  }
};

drawGrid(ctx) {
ctx.strokeStyle = "red";
ctx.lineCap = "round";
ctx.lineWidth = 1;
for (let i = 0; i < Grid.drawGrid.length; i ++) {
 let currentLine = Grid.drawGrid[i];
  ctx.beginPath();
  for (let j = 0; j < currentLine.length; j ++) {
    let pos = currentLine[j];
    if (pos.move) {
      ctx.moveTo(pos.move[0], pos.move[1]);
    } else if (pos.line) {
      ctx.lineTo(pos.line[0], pos.line[1]);
    } else if (pos.curve) {
      ctx.quadraticCurveTo(pos.curve[0], pos.curve[1],
        pos.curve[2], pos.curve[3]
      );
    }
  }
  ctx.stroke();
}
};

}

module.exports = Board;

var Player = Class.create({
  initialize: function(name, cell) {
    this.name = name;
    this.cell = cell;
  }
});

var Cell = Class.create({
  initialize: function(x, y, size) {
    this.x = x;
    this.y = y;
  }
});

var World = Class.create({

  initialize: function(id) {
    this.canvas = $(id);
    this.context = this.canvas.getContext("2d");

    this.cellSize = 20;
    this.resizeCanvas();
    this.centerCell(new Cell(0,0));
    this.cells = {};

    /*
    document.observe("mousemove", function(e) {
      var cell = this.cellFromPosition(e.pointerX(), e.pointerY());
    }.bind(this));
    */

    document.observe("click", function(e) {
      var cell = this.cellFromPosition(e.pointerX(), e.pointerY());
      this.centerCell(cell);
    }.bind(this));

    this.tickInterval = 100;
    this.ownPlayer = null;
    this.tick(); //starts the game loop
    this.initOwnPlayer(); //gets player info from server
  },

  getCell: function(x, y) {
    if (!this.cells[x]) {
      this.cells[x] = {};
    }
    if (!this.cells[x][y]) {
      this.cells[x][y] = new Cell(x, y);
    }
    return this.cells[x][y];
  },

  cellFromPosition: function(x, y) {
    var offset_x = x - this.origin.x;
    var offset_y = y - this.origin.y;
    var cell_x = Math.floor(offset_x / this.cellSize);
    var cell_y = Math.floor(offset_y / this.cellSize);
    return this.getCell(cell_x, cell_y);
  },

  tick: function () {
    var start = (new Date()).getTime();
    this.draw();
    var time = (start - (new Date()).getTime()) / 1000;
    setTimeout(this.tick.bind(this), this.tickInterval - time);
  },

  draw: function() {
    this.canvas.width = this.canvas.width; // clears canvas fast
    this.drawGrid();
    this.drawOwnPlayer();
    this.drawHUD();
    this.drawOrigin();
  },

  initOwnPlayer: function() {
    var name = prompt("What is your name?");

    if (name) {
      new Ajax.Request("/state", {
        method: "get",
        parameters: { player: name },
        onSuccess: function(transport) {
          var data = transport.responseText.evalJSON();
          var cell = new Cell(data.Location.X, data.Location.Y);
          this.ownPlayer = new Player(data.Name, cell);
          this.centerCell(cell);
        }.bind(this)
      });
    }
  },

  centerCell: function(cell) {
    this.centeredCell = cell;
    // find where 0,0 is
    var x = Math.floor(this.canvas.width  / (this.cellSize * 2)) * this.cellSize;
    var y = Math.floor(this.canvas.height / (this.cellSize * 2)) * this.cellSize;
    // move to this cell
    x -= cell.x * this.cellSize - (this.cellSize / 2);
    y -= cell.y * this.cellSize - (this.cellSize / 2);
    this.origin = {x: x, y: y};
  },

  resizeCanvas: function() {
    this.canvas.width  = document.viewport.getWidth();
    this.canvas.height = document.viewport.getHeight();
  },

  drawOwnPlayer: function() {
    if (this.ownPlayer == null) return;
    this.fillCell(this.ownPlayer.cell, "pink");
  },

  fillCell: function(cell, color) {
    if (!color) color = "white";
    this.context.fillStyle = color;
    var pos = this.findCellPosition(cell);
    this.context.fillRect(pos.x, pos.y, this.cellSize, this.cellSize);
  },

  drawHUD: function() {
    var ctx = this.context;
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "white";

    if (this.ownPlayer == null) {
      ctx.fillText("loading player...", 16, 16);
      return;
    }

    ctx.fillText("name: " + this.ownPlayer.name, 16, 16);
    ctx.fillText("x: " + this.ownPlayer.cell.x, 16, 32);
    ctx.fillText("y: " + this.ownPlayer.cell.y, 16, 48);
  },

  drawOrigin: function() {
    this.fillCell(new Cell(0,0), "red");
  },

  findCellPosition: function(cell) {
    // find where origin is
    var x = this.origin.x;
    var y = this.origin.y;
    // add this cell's offsets
    x += cell.x * this.cellSize;
    y += cell.y * this.cellSize;
    return {x: x, y: y};
  },

  drawGrid: function() {
    var ctx = this.context;
    var width = this.canvas.width;
    var height = this.canvas.height;
    var pos = this.findCellPosition(this.centeredCell);
    var x = pos.x, y = pos.y;

    ctx.strokeStyle = "rgba(255,255,255,0.25)";

    while (x <= width) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
      ctx.closePath();
      x += this.cellSize;
    }

    x = pos.x - this.cellSize;
    while (x >= 0) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
      ctx.closePath();
      x -= this.cellSize;
    }
    while (y <= height) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      ctx.closePath();
      y += this.cellSize;
    }
    y = pos.y - this.cellSize;
    while (y >= 0) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      ctx.closePath();
      y -= this.cellSize;
    }
  }

});

document.observe("dom:loaded", function() {
  var game = new World("view");  
  window.onresize = game.resizeCanvas.bind(game);
});


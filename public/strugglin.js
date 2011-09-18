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

    this.tickInterval = 100;
    this.ownPlayer = null;
    this.tick(); //starts the game loop
    this.initOwnPlayer(); //gets player info from server
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
    // find where 0,0 is
    var x = Math.floor(this.canvas.width  / (this.cellSize * 2)) * this.cellSize;
    var y = Math.floor(this.canvas.height / (this.cellSize * 2)) * this.cellSize;
    // move to this cell
    x -= cell.x * this.cellSize;
    y -= cell.y * this.cellSize;
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
    var x = this.origin.x + (cell.x * this.cellSize);
    var y = this.origin.y + (cell.y * this.cellSize);
    this.context.fillRect(x, y, this.cellSize, this.cellSize);
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
    var ctx = this.context;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.origin.x, this.origin.y, 2, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  },

  drawGrid: function() {
    var ctx = this.context;
    var width = this.canvas.width;
    var height = this.canvas.height;
    var x = 0, y = 0;

    ctx.strokeStyle = "rgba(255,255,255,0.25)";

    while (x <= width) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
      ctx.closePath();
      x += this.cellSize;
    }

    while (y <= height) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      ctx.closePath();
      y += this.cellSize;
    }
  }

});

document.observe("dom:loaded", function() {
  var game = new World("view");  
  window.onresize = game.resizeCanvas.bind(game);
});


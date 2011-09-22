var Player = Class.create({
  initialize: function(name, x, y, color) {
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
  }
});

var Cell = Class.create({
  initialize: function(x, y) {
    this.x = x;
    this.y = y;
    this.color = "rgba(0,0,0,0)";
  }
});

var World = Class.create({

  initialize: function(id) {
    this.canvas = $(id);
    this.context = this.canvas.getContext("2d");

    this.cellSize = 100;
    this.resizeCanvas();

    this.selection = []; // list of selected cells
    this.cell_map = {};
    this.players = [];

    this.originCell = this.getCell(0,0);
    this.originCell.color = "red";
    this.centerOnCell(this.originCell);

    document.observe("keydown", this.handleKey.bind(this));
    document.observe("mousedown",   this.handleMouseDown.bind(this));

    this.tickInterval = 100;
    this.ownPlayer = null;
    this.tick(); //starts the game loop
    this.initOwnPlayer(); //gets player info from server
  },

  handleMouseDown: function(e) {
    if (e.findElement("#controls")) return;
    var cell = this.cellFromPosition(e.pointerX(), e.pointerY());
    this.selection = [cell];
  },

  handleKey: function(e) {
    if (e.findElement("#controls")) return;
    var cell = this.centeredCell;
    var x = cell.x, y = cell.y;
    switch (e.keyCode) {
      case (37): //left
        x = cell.x - 1;
        break;
      case (38): //up
        y = cell.y - 1;
        break;
      case (39): //right
        x = cell.x + 1;
        break;
      case (40): //down
        y = cell.y + 1;
        break;
      case (65): //a
        this.ownPlayer.x -= 1;
        break;
      case (68): //d
        this.ownPlayer.x += 1;
        break;
      case (83): //s
        this.ownPlayer.y += 1;
        break;
      case (87): // w
        this.ownPlayer.y -= 1;
        break;
    }
    this.centerOnCell(this.getCell(x, y));
  },

  getCell: function(x, y) {
    if (!this.cell_map[x]) {
      this.cell_map[x] = {};
    }
    if (!this.cell_map[x][y]) {
      this.cell_map[x][y] = new Cell(x, y);
    }
    return this.cell_map[x][y];
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
    this.drawCells();
    this.drawPlayers();
    this.drawSelection();
    this.drawHUD();
  },

  cells: function() {
    return Object.values(this.cell_map).inject([], function(acc, row) {
      return acc.concat(Object.values(row));
    });
  },

  drawCells: function() {
    this.cells().each(function(cell){this.drawCell(cell)}.bind(this));
  },

  initOwnPlayer: function() {
    var name = prompt("What is your name?");

    if (name) {
      new Ajax.Request("/state", {
        method: "get",
        parameters: { player: name },
        onSuccess: function(transport) {
          var data = transport.responseText.evalJSON();
          this.ownPlayer = new Player(data.Name, data.Location.X, data.Location.Y, "pink");
          this.players.push(this.ownPlayer);
        }.bind(this)
      });
    }
  },

  centerOnCell: function(cell) {
    this.centeredCell = cell;
    // find where 0,0 is
    var x = this.canvas.width  / 2;
    var y = this.canvas.height / 2;
    // move to this cell
    x -= cell.x * this.cellSize + (this.cellSize / 2);
    y -= cell.y * this.cellSize + (this.cellSize / 2);
    this.origin = {x: x, y: y};
  },

  resizeCanvas: function() {
    this.canvas.width  = document.viewport.getWidth();
    this.canvas.height = document.viewport.getHeight();
  },

  drawCell: function(cell) {
    var pos = this.getPosition(cell);
    this.context.fillStyle = cell.color;
    this.context.fillRect(pos.x, pos.y, this.cellSize, this.cellSize);
  },

  drawSelection: function() {
    this.selection.each(function(cell) {
      this.context.fillStyle = "#00FF00";
      var pos = this.getPosition(cell);
      var line_width = Math.floor(Math.max(2, Math.min(8, this.cellSize / 20)));
      this.context.fillRect(pos.x, pos.y, this.cellSize, line_width);
      this.context.fillRect(pos.x, pos.y, line_width, this.cellSize);
      this.context.fillRect(pos.x + this.cellSize, pos.y, -line_width, this.cellSize);
      this.context.fillRect(pos.x, pos.y + this.cellSize, this.cellSize, -line_width);
    }.bind(this));
  },

  drawPlayers: function() {
    this.players.each(function(player) {
      var pos = this.getPosition(player);
      this.context.fillStyle = player.color;
      this.context.fillRect(pos.x, pos.y, this.cellSize, this.cellSize);
    }.bind(this));
  },

  drawHUD: function() {
    var ctx = this.context;
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "white";

    if (this.ownPlayer == null) {
      ctx.fillText("loading player...", 16, 16);
      return;
    }

    this.players.each(function(player) {
      var pos = this.getPosition(player);
      ctx.fillText(player.name + "("+player.x+","+player.y+")", pos.x, pos.y);
    }.bind(this));
  },

  getPosition: function(cell) {
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
        width = this.canvas.width,
        height = this.canvas.height,
        pos = this.getPosition(this.centeredCell);
    var x = pos.x, y = pos.y;

    ctx.strokeStyle = "#5CA739";

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

  window.onresize = function() {
    game.resizeCanvas();
    game.centerOnCell(game.centeredCell);
  };

  $('scale').observe("change", function(e) {
    game.cellSize = Number(this.value);
    game.centerOnCell(game.centeredCell);
  });
});


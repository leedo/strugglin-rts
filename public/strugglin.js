var World = Class.create({

  initialize: function(id) {
    this.canvas = $(id);
    this.context = this.canvas.getContext("2d");
    this.gridSize = 20; // length of a grid side
    this.prepareCanvas();
    this.initOwnPlayer();
    this.draw();
  },

  initOwnPlayer: function() {
    var name = prompt("What is your name?");

    if (name) {
      new Ajax.Request("/state", {
        method: "get",
        parameters: { player: name },
        onSuccess: function(transport) {
          var data = transport.responseText.evalJSON();
          console.log(data);
        }
      });
    }
  },

  prepareCanvas: function() {
    this.canvas.width = document.viewport.getWidth();
    this.canvas.height = document.viewport.getHeight();
  },

  draw: function() {
    this.drawGrid();
  },

  drawGrid: function() {
    var ctx = this.context;
    var width = this.canvas.width;
    var height = this.canvas.height;
    var x = 0, y = 0;

    ctx.strokeStyle = "white";

    while (x <= width) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
      ctx.closePath();
      x += this.gridSize;
    }

    while (y <= height) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      ctx.closePath();
      y += this.gridSize;
    }
  }

});

document.observe("dom:loaded", function() {
  var game = new World("view");  
  window.onresize = game.prepareCanvas.bind(game);
});


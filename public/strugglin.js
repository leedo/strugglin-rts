var World = Class.create({

  initialize: function(id) {
    this.canvas = $(id);
    this.canvas.width = document.viewport.getWidth();
    this.canvas.height = document.viewport.getHeight();

    this.context = this.canvas.getContext("2d");
    this.gridSize = 20; // length of a grid side
    this.drawGrid();
  },

  drawGrid: function() {
    var ctx = this.context;
    var width = this.canvas.width;
    var height = this.canvas.height;
    var x = 0, y = 0;

    while (x <= width) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
      x += this.gridSize;
    }

    while (y <= height) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.moveTo(width, y);
      ctx.stroke();
      y += this.gridSize;
    }
  }

});

document.observe("dom:loaded", function() {
  var game = new World("view");  
});

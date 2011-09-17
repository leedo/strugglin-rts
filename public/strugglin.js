var Game = Class.create({
  initialize: function(id) {
    this.canvas = $(id);
  }
});

document.observe("dom:loaded", function() {
  var game = new Game("game");  
});

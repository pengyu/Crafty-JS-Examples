window.onload = function () {
  Crafty.init(400, 336);
  Crafty.scene("main", function () {
      Crafty.e("2D, DOM, Color")
      .attr({x: 0, y: 0, w: 50, h: 50})
      .color("rgb(0,255,0)");
    });

  Crafty.each(function () {
      this.color("blue");
    });

  Crafty.scene("main");
}



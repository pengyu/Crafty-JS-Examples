window.onload = function () {
  var width=400;
  var height=400;
  Crafty.init(width, height);

  Crafty.scene("main", function () {
      Crafty.e("2D, DOM, Color, MoveTo")
      .attr({x: 0, y: 0, w: 50, h: 50})
      .color("rgb(0,255,0)")
      .bind("EnterFrame", function () {
          ++this.x;
          ++this.y;
        });
    });

  Crafty.scene("main");
}



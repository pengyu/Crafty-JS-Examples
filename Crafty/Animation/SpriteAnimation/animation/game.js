window.onload = function () {
  Crafty.init(400, 336);

  //turn the sprite map into usable components
  Crafty.sprite(16, "sprite.png", {
      player: [0, 3],
    });

  Crafty.scene("main", function () {
      var id="walk_left";
      var fromX=6;
      var y=3;
      var toX=8;
      duration=10;
      repeatCount=-1;

      var player2 = Crafty.e("2D, DOM, player, SpriteAnimation")
      .attr({ x: 368, y: 16, z: 1 })
      .animate(id, fromX, y, toX)
      .animate(id, duration, repeatCount);
    });

  Crafty.scene("main");
}

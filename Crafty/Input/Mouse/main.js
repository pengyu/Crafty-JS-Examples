window.onload = function () {
  Crafty.init(400, 336);
  Crafty.canvas.init();

  Crafty.c("MoveTo", {
      _speed: 2,

      _onmousedown:function (e) {
        this._target = { x: e.realX, y: e.realY };
        var dx = e.realX - this.x, dy = e.realY - this.y;
        this._movement={
          x:(dx * this._speed) / (Math.sqrt(dx * dx + dy * dy)),
          y:(dy * this._speed) / (Math.sqrt(dx * dx + dy * dy))
        },
        this.trigger('NewDirection', this._movement);
      },

      init: function () {
        //this.requires("Mouse");

        Crafty.addEvent(this, Crafty.stage.elem, "mousedown", this._onmousedown);

        /*
        this.bind('NewDirection', function(arg) {
            alert('NewDirection is called');
          }
        );
          */

        var norm=function(x, y) {
          absx=Math.abs(x);
          absy=Math.abs(y);

          if(absx>absy) {
            max=absx;
            min=absy;
          } else {
            max=absy;
            min=absx;
          }

          return max*Math.sqrt(1+Math.pow(min/max,2));
        };


        this.bind("EnterFrame", function () {
            /*
             document.getElementById('x').innerHTML=this.x;
             document.getElementById('y').innerHTML=this.y;
             if(this._target) {
             document.getElementById('targetx').innerHTML=this._target.x;
             document.getElementById('targety').innerHTML=this._target.y;
           }
           */
          if (this.disableControls || !this._target) return;
          if (norm(this._target.x - this.x, this._target.y - this.y) < this._speed) {
            this._movement={
              x:this._target.x - this.x,
              y:this._target.y - this.y
            };
            this.x=this._target.x;
            this.y=this._target.y;
            this._target=undefined;
            this.trigger('NewDirection', this._movement);
          }

          if (this._movement.x !== 0) {
            this.x += this._movement.x;
            this.trigger('Moved', { x: this.x - this._movement.x, y: this.y });
          }
          if (this._movement.y !== 0) {
            this.y += this._movement.y;
            this.trigger('Moved', { x: this.x, y: this.y - this._movement.y });
          }
        });
    }
  });

Crafty.scene("main", function () {
    Crafty.e("2D, DOM, Color, MoveTo")
    .attr({x: 0, y: 0, w: 50, h: 50})
    .color("rgb(0,255,0)");
  });

Crafty.scene("main");
}



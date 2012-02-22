Crafty.c("Circle2D", {
    _radius: 8,
    fillStyle:"rgba(0,255,0,1)",
    strokeStyle: "rgba(0,0,0,0)",
    ready: true,

    get radius() { return this._radius; },
    set radius(r) {
      this._radius = r;
      this.w = this.h = 2*this.radius;
      this.trigger("Change");
    },

    init: function() {
      //this.requires("2D, Canvas");

      this.w = this.h = 2*this.radius;
      var TWO_PI = Math.PI*2;

      var draw=function(e) {
        if (e.type === "canvas") {
          e.ctx.fillStyle = this.fillStyle;
          e.ctx.strokeStyle = this.strokeStyle;
          e.ctx.beginPath();
          e.ctx.arc(this.x, this.y, this.radius, 0, TWO_PI, true);
          e.ctx.closePath();
          e.ctx.fill();
        }
        this.trigger("Change")
      };

      this.bind("Draw", draw).bind("RemoveComponent", function (id) {
          if (id === "Circle2D") this.unbind("Draw", draw);
        });
      //this.trigger("Change");
    },

    circle: function(radius) {
      this.radius = radius;
      this.trigger("Change");
      return this;
    },

    color: function(c) {
      //this.fillStyle = Crafty.toRGB(c,this.alpha);
      this.fillStyle = Crafty.toRGB(c, 1);
      return this;
    }
  });

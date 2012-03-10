Crafty.c("Circle2D", {
    _radius: 8,
    _friction_constant: .997,
    fillStyle:"rgba(0,255,0,1)",
    strokeStyle: "rgba(0,0,0,0)",
    ready: true,

    getCenterX: function() { return this.x+this._radius;},
    getCenterY: function() { return this.y+this._radius;},

    /*
     getRadius: function() { return this._radius; },
     setRadius: function(r) {
     this._radius = r;
     this.w = this.h = 2*this.radius;
     this.trigger("Change");
   },

   setCircleX(x): function {
   this.x=x-this._radius;
   this.trigger("Change");
 },

 setCircleY(y) {
 this.y=y-this._radius;
 this.trigger("Change");
    },
    */

    get vel() {
      return {
        vx: this.vx
        , vy: this.vy
      };
    },
    set vel(v) {
      this.vx=v['vx'];
      this.vy=v['vy'];
      this.trigger("Change");
    },

    addVelocity: function(vx, vy) {
      this.vx+=vx;
      this.vy+=vy;

      this.trigger("Change");
    },

    step: function() {
      this.x += this.vx;
      this.y += this.vy;
      if(this.x>400) {
        this.x-=400;
      }
      if(this.y>400) {
        this.y-=400;
      }
      this.vx *= this._friction_constant;
      this.vy *= this._friction_constant;
    },

    init: function() {
      this.requires("2D, Canvas");

      this.w = this.h = 2*this._radius;
      var TWO_PI = Math.PI*2;

      var draw=function(e) {
        if (e.type === "canvas") {
          e.ctx.fillStyle = this.fillStyle;
          e.ctx.strokeStyle = this.strokeStyle;
          e.ctx.beginPath();
          e.ctx.arc(this.x + this._radius, this.y + this._radius, this._radius, 0, TWO_PI, true);
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

    circleCenter: function(x, y) {
      this.x = x - this._radius;
      this.y = y - this._radius;
      this.trigger("Change");
      return this;
    },

    circleRadius: function(radius) {
      this._radius = radius;
      this.x = this.x + this._radius - radius;
      this.y = this.y + this._radius - radius;
      this.trigger("Change");
      return this;
    },

    velocity: function(vx, vy) {
      this.vx = vx;
      this.vy = vy;
      this.trigger("Change");
      return this;
    },

    color: function(c) {
      //this.fillStyle = Crafty.toRGB(c,this.alpha);
      this.fillStyle = Crafty.toRGB(c, 1);
      return this;
    }
  });

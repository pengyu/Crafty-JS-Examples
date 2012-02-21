//{{{ Circle Component
Crafty.c("Circle", {
        _radius: 8,
        fillStyle:"rgba(0,255,0,1)",
        strokeStyle: "rgba(0,0,0,0)",
        ready: true,

        get radius() { return this._radius; },
        set radius(r) {
                this._radius = r;
                this.w = this.h = 2*this.radius;
                this.trigger("change");
        },

        init: function() {
                this.requires("2D, Canvas");

                this.w = this.h = 2*this.radius;
                var TWO_PI = Math.PI*2;

                this.bind("draw", function(e) {
                        e.ctx.fillStyle = this.fillStyle;
                        e.ctx.strokeStyle = this.strokeStyle;
                        e.ctx.beginPath();
                        e.ctx.arc(this.x, this.y, this.radius, 0, TWO_PI, true);
                        e.ctx.closePath();
                        e.ctx.fill();
                        });
                this.trigger("change");
        },
        circle: function(radius) {
                this.radius = radius;
                this.trigger("change");
                return this;
        },

        color: function(c) {
                //this.fillStyle = Crafty.toRGB(c,this.alpha);
                this.fillStyle = Crafty.toRGB(c, 1);
                return this;
        }
});

//}}} 

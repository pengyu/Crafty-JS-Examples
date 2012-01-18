/**@
 * #Draggable
 * @category Input
 * Give the ability to drag and drop the entity.
 */
Crafty.c("DraggableHorizontal", {
    _startX: 0,
    _dragging: false,

    _ondrag: null,
    _ondown: null,
    _onup: null,

    init: function() {
      this.requires("Mouse");
      this._ondrag = function(e) {
        var pos = Crafty.DOM.translate(e.clientX, e.clientY);
        this.x = pos.x - this._startX;

        //this.trigger("Dragging", e);
      };

      this._ondown = function(e) {
        if(e.button !== 0) return;

        //start drag
        this._startX = e.realX - this._x;
        this._dragging = true;

        Crafty.addEvent(this, Crafty.stage.elem, "mousemove", this._ondrag);
        Crafty.addEvent(this, Crafty.stage.elem, "mouseup", this._onup);
        this.trigger("StartDrag", e);
      };

      this._onup = function upper(e) {
        Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", this._ondrag);
        Crafty.removeEvent(this, Crafty.stage.elem, "mouseup", this._onup);
        this._dragging = false;
      };

      this.enableDrag();
    },

    enableDrag: function() {		
      this.bind("MouseDown", this._ondown);
      Crafty.addEvent(this, Crafty.stage.elem, "mouseup", this._onup);
      return this;
    },
    disableDrag: function() {
      this.unbind("MouseDown", this._ondown);
      this.stopDrag();
      return this;
    },
    startDrag: function() {
      if(!this._dragging) {
        this._dragging = true;
        Crafty.addEvent(this, Crafty.stage.elem, "mousemove", this._ondrag);
      }
      return this;
    },
    stopDrag: function() {
      Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", this._ondrag);
      Crafty.removeEvent(this, Crafty.stage.elem, "mouseup", this._onup);
      this._dragging = false;
      return this;
    },
  });


window.onload = function () {
  Crafty.init(400, 336);

  Crafty.scene("main", function () {
      Crafty.e("2D, DOM, DraggableHorizontal")
      .attr({
          x: 150
          , y: 120 
          , w: 100
          , h: 100
        })
      .css({
          "background-color": "red"
        });
    });

  Crafty.scene("main");
};


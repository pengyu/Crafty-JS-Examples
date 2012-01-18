  /**@
  * #.multiway
  * @comp Multiway
  * @sign public this .multiway([Number speed,] Object keyBindings )
  * @param speed - Amount of pixels to move the entity whilst a key is down
  * @param keyBindings - What keys should make the entity go in which direction. Direction is specified in degrees
  * Constructor to initialize the speed and keyBindings. Component will listen for key events and move the entity appropriately. 
  *
  * When direction changes a NewDirection event is triggered with an object detailing the new direction: {x: x_movement, y: y_movement}
  * When entity has moved on either x- or y-axis a Moved event is triggered with an object specifying the old position {x: old_x, y: old_y}
  * @example
  * ~~~
  * this.multiway(3, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});
  * this.multiway({W: -90, S: 90, D: 0, A: 180});
  * ~~~
  */
  multiway: function(speed, keys) {
    if(keys){
      this._speed = speed;
    } else {
      keys = speed;
    }
    
    this._keyDirection = keys;
    this.speed(this._speed);

    this.bind("KeyDown", function(e) {
      if(this._keys[e.key]) {
        this._movement.x = Math.round((this._movement.x + this._keys[e.key].x)*1000)/1000;
        this._movement.y = Math.round((this._movement.y + this._keys[e.key].y)*1000)/1000;
        this.trigger('NewDirection', this._movement);
      }
    })
    .bind("KeyUp", function(e) {
      if(this._keys[e.key]) {
        this._movement.x = Math.round((this._movement.x - this._keys[e.key].x)*1000)/1000;
        this._movement.y = Math.round((this._movement.y - this._keys[e.key].y)*1000)/1000;
        this.trigger('NewDirection', this._movement);
      }
    })
    .bind("EnterFrame",function() {
      if (this.disableControls) return;
  
      if(this._movement.x !== 0) {
        this.x += this._movement.x;
        this.trigger('Moved', {x: this.x - this._movement.x, y: this.y});
      }
      if(this._movement.y !== 0) {
        this.y += this._movement.y;
        this.trigger('Moved', {x: this.x, y: this.y - this._movement.y});
      }
    });

        //Apply movement if key is down when created
        for(var k in keys) {
            if(Crafty.keydown[Crafty.keys[k]]) {
                this.trigger("KeyDown", {key: Crafty.keys[k] });
            }
        }
    
    return this;
  },


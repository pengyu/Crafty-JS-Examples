/**@
 * #.trigger
 * @comp Crafty Core
 *
 * @sign public this .trigger(String eventName[, Object data])
 * @param eventName - Event to trigger
 * @param data - Arbitrary data that will be passed into every callback as an argument
 * Trigger an event with arbitrary data. Will invoke all callbacks with 
 * the context (value of `this`) of the current entity object.
 *
 * *Note: This will only execute callbacks within the current entity, no other entity.*
 *
 * The first argument is the event name to trigger and the optional 
 * second argument is the arbitrary event data. This can be absolutely anything.
 */
trigger: function(event, data) {
  if(this.length === 1) {
    //find the handlers assigned to the event and entity
    if(handlers[event] && handlers[event][this[0]]) {
      var fns = handlers[event][this[0]], i = 0, l = fns.length;
      for(;i<l;i++) {
        fns[i].call(this, data);
      }
    }
    return this;
  }

  this.each(function() {
      //find the handlers assigned to the event and entity
      if(handlers[event] && handlers[event][this[0]]) {
        var fns = handlers[event][this[0]], i = 0, l = fns.length;
        for(;i<l;i++) {
          fns[i].call(this, data);
        }
      }
    });
  return this;
},


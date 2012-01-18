/**@
 * #.bind
 * @comp Crafty Core

 * @sign public this .bind(String eventName, Function callback)
 * @param eventName - Name of the event to bind to
 * @param callback - Method to execute when the event is triggered

 * Attach the current entity (or entities) to listen for an event.
 *
 * Callback will be invoked when an event with the event name passed 
 * is triggered. Depending on the event, some data may be passed 
 * via an argument to the callback function.
 *
 * The first argument is the event name (can be anything) whilst the 
 * second argument is the callback. If the event has data, the 
 * callback should have an argument.
 *
 * Events are arbitrary and provide communication between components. 
 * You can trigger or bind an event even if it doesn't exist yet.
 * @example
 * ~~~
 * this.attr("triggers", 0); //set a trigger count
 * this.bind("myevent", function() {
 *     this.triggers++; //whenever myevent is triggered, increment
 * });
 * this.bind("EnterFrame", function() {
 *     this.trigger("myevent"); //trigger myevent on every frame
 * });
 * ~~~
 * @see .trigger, .unbind
 */
bind: function(event, fn) {
  //optimization for 1 entity
  if(this.length === 1) {
    if(!handlers[event]) handlers[event] = {};
    var h = handlers[event];

    if(!h[this[0]]) h[this[0]] = []; //init handler array for entity
    h[this[0]].push(fn); //add current fn
    return this;
  }

  this.each(function() {
      //init event collection
      if(!handlers[event]) handlers[event] = {};
      var h = handlers[event];

      if(!h[this[0]]) h[this[0]] = []; //init handler array for entity
      h[this[0]].push(fn); //add current fn
    });
  return this;
},


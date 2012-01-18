/**@
 * #.delay
 * @comp Crafty Core
 * @sign public this .delay(Function callback, Number delay)
 * @param callback - Method to execute after given amount of milliseconds
 * @param delay - Amount of milliseconds to execute the method
 * The delay method will execute a function after a given amount of time in milliseconds.
 *
 * Essentially a wrapper for `setTimeout`.
 *
 * @example
 * Destroy itself after 100 milliseconds
 * ~~~
 * this.delay(function() {
 this.destroy();
 * }, 100);
 * ~~~
 */
delay: function(fn, duration) {
  this.each(function() {
      var self = this;
      setTimeout(function() {
          fn.call(self);
        }, duration);
    });
  return this;
},


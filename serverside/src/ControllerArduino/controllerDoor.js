var five = require("johnny-five")
var board = new five.Board();

board.on("ready", (motor) => {

  var motor = new five.Motor({
    pins: {
      pwm: 3,
      dir: 12,
      brake: 9
    }
  });

  motor.on("forward", function(err, timestamp) {
    // demonstrate braking after 5 seconds
    board.wait(5000, function() {
      motor.brake();
    });
  });

  motor.on("brake", function(err, timestamp) {
    // Release the brake after .1 seconds
    board.wait(100, function() {
      motor.stop();
    });
  });

  // Start the motor at maximum speed
  motor.forward(255);

});

/*
var led = null;
board.on("ready", (led) =>{
  led = new five.Led(13)
  led.off()
})
*/

module.exports = led
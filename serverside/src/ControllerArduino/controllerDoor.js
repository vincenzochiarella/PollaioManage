var five = require("johnny-five")

var board = new five.Board();
var led = null;
board.on("ready", (led) =>{
  led = new five.Led(13)
  // led.blink(1000)
})






module.exports = led
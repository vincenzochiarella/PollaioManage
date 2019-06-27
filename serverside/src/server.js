
var five = require("johnny-five")
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)


/* start rtsp */
const rtsp = require('rtsp-ffmpeg');


/*  end rtsp */


var Users = require('./routes/users')
var ChickenHouse = require('./routes/chickenhouse')


const port = 8080;
var led = require('./ControllerArduino/controllerDoor')

// //test for socket io stream
// setInterval(() =>{
//      io.emit('image','Usa il server ogni secondo')
//  },1000)



app.use(cors())
app.options('*', cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
server.listen(port, () => console.log(`Listening on port ${port}`));

app.use('/users', Users)
app.use('/chickens', ChickenHouse)


// app.get('/led/:mode', function (req, res){
//          switch(req.params.mode){
//              case "open":
//                  led.led.on()
//                  console.log("arriva")
//                  break
//              case "off":
//                  led.led.off()
//                  res.send({
//                     status: "off"
//                 })
//                  break
//          }



// })

var uri = 'rtsp://192.168.1.1:554/11',
   stream = new rtsp.FFMpeg({
      input: uri,
      rate: 20, // output framerate (optional)
      resolution: '640x480', // output resolution in WxH format (optional)
      quality: 3 // JPEG compression quality level (optional)
   });
io.on('connection', function (socket) {
   var pipeStream = function (data) {
      socket.emit('data', data.toString('base64'));
   };
   stream.on('data', pipeStream);
   socket.on('disconnect', function () {
      stream.removeListener('data', pipeStream);
   });
});
app.get('/led/1', function (req, res) {
   led.on()
   res.send("on")
})
app.get('/led/0', function (req, res) {
   led.off()
   res.send("off")
})

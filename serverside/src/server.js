
var five = require("johnny-five")
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, { origins: '*:*' })

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;



var weekMoovs = require('./routine/SunMoovementRequest')
var automatic = require('./routine/Automatization')
// weekMoovs.syncAPIExternal()
automatic.startSyncTodayMoovs
automatic.startSyncEveryDayWeather


// const SimpleNodeLogger = require('simple-node-logger'),
//    opts = {
//       logFilePath: 'logImgRaw.log',
//       timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
//    },
//    log = SimpleNodeLogger.createSimpleLogger(opts);

/* start rtsp */
const rtsp = require('rtsp-ffmpeg');
/*  end rtsp */

/* start deployment part*/
// const path = require('path');
// app.use(express.static(path.join(__dirname, '../../clientside/build')));

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '../../clientside/build', 'index.html'));
// });
//--------uncomment after npm run build in clientside-------
/*  end deployment part */


var Users = require('./routes/users')
var ChickenHouse = require('./routes/chickenhouse')
var Door = require('./routes/door')
var Jobs = require('./routes/jobs')


const port = 5000;
// var motor = require('./ControllerArduino/controllerDoor')


app.use(cors())
app.options('*', cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
server.listen(port, () => console.log(`Listening on port ${port}`));

app.use('/users', Users)
app.use('/ckHouse', ChickenHouse)
app.use('/door', Door)
app.use('/job',Jobs)




var uri = 'rtsp://192.168.1.1:554/11',
   stream = new rtsp.FFMpeg({
      input: uri,
      rate: 10, // output framerate (optional)
      resolution: '1280x720', // output resolution in WxH format (optional)
      quality: 3 // JPEG compression quality level (optional)
   });


//CORRETTO i dati vengono trasferiti alla socket ma la socket del client non li riceve
var extCam = io.of('/externalcam')
extCam.on('connection', function (socket) {
   stream.on('data', (data) => {
      socket.emit('data', data.toString('base64'))
   })
   socket.on('disconnect', () => {

   })
})
extCam.on('disconnect', function (socket) {

})


//--------start---------------INTERNAL Camera stream
var process;
var intervalObj;
var intCam = io.of('/internalcam')
intCam.on('connection', function(socket) {
   socket.on('start-stream', function() {
       if (!isStreaming) {
           startStreaming();
       } else {
           sendImage();
       }
   });

   socket.on('disconnect', function() {       
           stopStreaming();       
   });
});

function startStreaming() {
   isStreaming = true;
   intervalObj = setInterval(takeImage, 200);
}

function stopStreaming() {
   isStreaming = false;
   if (process) {
       process.kill();
   }
   clearInterval(intervalObj);
}

function takeImage() {
   //console.log('taking image');
   var args = [
       '-w', 640,   // width
       '-h', 480,  // height
       '-t', 100,  // how long should taking the picture take?
       '-o', getAbsoluteImagePath()   // path + name
   ];
   process = spawn('raspistill', args);
   process.on('exit', sendImage);
}

function sendImage() {
   //console.log('sending image');
   fs.readFile(getAbsoluteImagePath(), function(err, buffer){
      intCam.socket.emit('live-stream', buffer.toString('base64'));
   });
}

function getAbsoluteImagePath() {
   return path.join(__dirname, "stream", "image.jpg");
}
//--------------end------------------------


// var five = require("johnny-five")
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, { origins: '*:*' })

const streamffmpeg= require('rtsp-ffmpeg')

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;



var weekMoovs = require('./routine/SunMoovementRequest')
var automatic = require('./routine/Automatization')
var jobManagement = require('./routine/JobSync')
//weekMoovs.APICallsWeekly()

automatic.startSyncTodayMoovs
automatic.startSyncEveryDayWeather
// automatic.overrideSyncTodayMoves()
jobManagement.syncAllJob()


// const SimpleNodeLogger = require('simple-node-logger'),
//    opts = {
//       logFilePath: 'logImgRaw.log',
//       timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
//    },
//    log = SimpleNodeLogger.createSimpleLogger(opts);



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
var Brightness = require('./routes/brightness')
var BatteryLevel = require('./routes/batteryLevel')


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
app.use('/bright',Brightness)
app.use('/battery', BatteryLevel)



//--------start---------------EXTERNAL Camera stream


var stream = new streamffmpeg.FFMpeg({
    input: 'rtsp://192.168.2.1:554/11',
    rate: 10, // output framerate (optional)
    resolution: '1280x720', // output resolution in WxH format (optional)
    quality: 3 // JPEG compression quality level (optional)
 });
const testSocket = io.of('/socketTest')
testSocket.on('connetion', (socket)=>{
    console.log('TestSocket ok')
    var count = 0
    setInterval(()=>{
        socket.emit('counter', (counter) =>{
            count = count + 1
        })
    },2000)
 
})
//CORRETTO i dati vengono trasferiti alla socket ma la socket del client non li riceve
const externalCamera = io.of('/externalCam') 
externalCamera.on('connection', function (socket) {

   console.log('Socket aperta')
   stream.on('data', (data) => {
      socket.emit('data', data.toString('base64'))
    })
   socket.on('disconnect', () => {
      console.log('Socket chiusa')
      stream.removeListener('data', ()=>{
         console.log('Connessione chiusa')
      });
   })
})
// io.on('disconnect', function (socket) {

// })

//--------------end------------------------


//--------start---------------INTERNAL Camera stream
var process;
var intervalObj;
var intCam = io.of('/intcam')
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

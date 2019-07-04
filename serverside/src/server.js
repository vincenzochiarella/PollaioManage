
var five = require("johnny-five")
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, { origins: '*:*' })

// const SimpleNodeLogger = require('simple-node-logger'),
//    opts = {
//       logFilePath: 'logImgRaw.log',
//       timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
//    },
//    log = SimpleNodeLogger.createSimpleLogger(opts);

/* start rtsp */
const rtsp = require('rtsp-ffmpeg');


/*  end rtsp */


var Users = require('./routes/users')
var ChickenHouse = require('./routes/chickenhouse')


const port = 8080;
var motor = require('./ControllerArduino/controllerDoor')


app.use(cors())
app.options('*', cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
server.listen(port, () => console.log(`Listening on port ${port}`));

app.use('/users', Users)
app.use('/ckHouse', ChickenHouse)




var uri = 'rtsp://192.168.1.1:554/11',
   stream = new rtsp.FFMpeg({
      input: uri,
      rate: 10, // output framerate (optional)
      resolution: '1280x720', // output resolution in WxH format (optional)
      quality: 3 // JPEG compression quality level (optional)
   });



//CORRETTO i dati vengono trasferiti alla socket ma la socket del client non li riceve
io.on('connection', function (socket) {
   stream.on('data', (data) => {
      socket.emit('data', data.toString('base64'))
   })
})





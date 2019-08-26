const path = require('path');
const fs = require('fs');
const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '../../.certs/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../../.certs/cert.pem'))
};

const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const server = require('https').createServer(httpsOptions, app)
const io = require('socket.io')(server, { origins: '*:*' })


/* start deployment part*/

app.use(express.static(path.join(__dirname, '../../clientside/build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../clientside/build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
});
//--------uncomment after npm run build in clientside-------
/*  end deployment part */


// var motor = require('./ControllerArduino/controllerDoor')


app.use(cors())
app.options('*', cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const port = 5443;
server.listen(port, () => console.log(`Listening on port ${port}`));

var Users = require('./APIdb/users')
var ChickenHouse = require('./APIdb/chickenhouse')
var Door = require('./APIdb/door')
var Jobs = require('./APIdb/jobs')
var Brightness = require('./APIdb/brightness')
var BatteryLevel = require('./APIdb/batteryLevel')
app.use('/users', Users)
app.use('/ckHouse', ChickenHouse.routes)
app.use('/door', Door.routes)
app.use('/job', Jobs.routes)
app.use('/bright', Brightness.routes)
app.use('/battery', BatteryLevel.routes)


const init = require('./ServerInit')
init.init()



//--------start---------------EXTERNAL Camera stream

const st = require('rtsp-ffmpeg')
var streamExternal = new st.FFMpeg({
    input: 'rtsp://192.168.2.1:554/11',
    rate: 10, // output framerate (optional)
    resolution: '1280x720', // output resolution in WxH format (optional)
    quality: 3 // JPEG compression quality level (optional)
});

//CORRETTO i dati vengono trasferiti alla socket ma la socket del client non li riceve
var external = io.of('/camext/stream')
external.on('connection', function (socket) {
    console.log('Socket aperta')
    streamExternal.on('data', (data) => {
        socket.emit('data', data.toString('base64'))
    })
    socket.on('disconnect', () => {
        streamExternal.removeListener('data', () => {
            console.log('Remove external cam')
        });
    })
})

//--------------end------------------------


//--------start---------------INTERNAL Camera stream
const intcam = require('./streaming/RaspPiCameraStream')

var streamInternal = new st.FFMpeg({
    input: 'rtsp://127.0.0.1:8554/',
    rate: 10, // output framerate (optional)
    resolution: '1280x720', // output resolution in WxH format (optional)
    quality: 3 // JPEG compression quality level (optional)
});

var internal = io.of('/#/camint/stream')
internal.on('connection', function (socket) {
    intcam.startVlcRTSP()
    streamInternal.on('data', (data) => {
        socket.emit('data', data.toString('base64'))
    })
    socket.on('disconnect', () => {
        intcam.stopVlcRTSP()
        streamInternal.removeListener('data', () => {
            console.log('Connessione chiusa')
        });
    })
})
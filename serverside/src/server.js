const path = require('path');
const fs = require('fs');
// const httpsOptions = {
// 	key: fs.readFileSync(path.join(__dirname, '../../.certs/key.pem')),
// 	cert: fs.readFileSync(path.join(__dirname, '../../.certs/cert.pem'))
// };

const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const http = require('http')
// const server = require('https').createServer(httpsOptions, app)
const server = require('http').createServer(app)
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


//Test 1 web socket
const ws = require('ws')
var socketServer = new ws.Server({ server: server, path: '/intcam', perMessageDeflate: false });
socketServer.connectionCount = 0;
socketServer.on('connection', function(socket, upgradeReq) {
	socketServer.connectionCount++;
	console.log(
		'New WebSocket Connection: ', 
		(upgradeReq || socket.upgradeReq).socket.remoteAddress,
		(upgradeReq || socket.upgradeReq).headers['user-agent'],
		'('+socketServer.connectionCount+' total)'
	);
	socket.on('close', function(code, message){
		socketServer.connectionCount--;
		console.log(
			'Disconnected WebSocket ('+socketServer.connectionCount+' total)'
		);
	});
});
socketServer.broadcast = function (data) {
	//Manda i dati ricevuti dalla Rasppicam Su
	socketServer.clients.forEach(function each(client) {
		if (client.readyState === ws.OPEN) {
			client.send(data);
		}
	});
};


// app.all('/endpointFFmpegRaspPiCam', (req, res) =>{
// 	console.log("Ok recived int video")
// 	res.connection.setTimeout(0);
// 	req.on('data', function (data) {
// 		socketServer.broadcast(data);
// 	})
// })
var streamServer = http.createServer( function(request, response) {
	var params = request.url.substr(1).split('/');

	if (params[0] !== 'endpointFFmpegRaspPiCam') {
		console.log(
			'Failed Stream Connection: '+ request.socket.remoteAddress + ':' +
			request.socket.remotePort + ' - wrong secret.'
		);
		response.end();
	}

	response.connection.setTimeout(0);
	console.log(
		'Stream Connected: ' + 
		request.socket.remoteAddress + ':' +
		request.socket.remotePort
	);
	request.on('data', function(data){
		socketServer.broadcast(data);

	});
	request.on('end',function(){
		console.log('close');
	});
}).listen(5555);


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
var external = io.of('/streamext')
external.on('connection', function (socket) {
	console.log('Socket aperta')
	streamExternal.on('data', (data) => {
		socket.emit('data', data.toString('base64'))
	})
	socket.on('disconnect', () => {
		console.log('Remove external cam')
	})
})

//--------------end------------------------


var five = require("johnny-five")
const express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const cors = require('cors')

const server = require('http').Server(app)
const io = require('socket.io')(server)

const app = express();
const port = 8080;


var led = require('./ControllerArduino/controllerDoor')

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Pollaio2019*',
	database : 'mydb'
});

app.use(cors())
app.options('*', cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));

server.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/prova', (req, res) => {
    res.send({ express: 'Login' });
  });
//non ancora criptato TEST 1
app.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if(username && password) {
        connection.query('SELECT * FROM Session WHERE username = ? AND password = ?', [username,password], function(error, result, fields){
            if(result.length > 0){
                response.send({
                    auth: true
                })
            }
            response.end();
        })
    }
    response.send({
        auth: true
    })

})
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
app.get('/led/1', function (req, res){
    led.on()
    res.send("on")
 })
 app.get('/led/0', function (req, res){
    led.off()
    res.send("off")
 })

//test for socket io stream
 setInterval(() =>{
     io.emit('image','some date')
 },1000)
const express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const port = 8080;


var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Pollaio2019*',
	database : 'mydb'
});
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));

var urlencoded = bodyParser.urlencoded({extended : true })

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/prova', (req, res) => {
    res.send({ express: 'Login' });
  });
//non ancora criptato TEST 1
app.post('/auth',urlencoded, function(request, response) {
    // console.log(request.body)
    var username = request.body.username;
    var password = request.body.password;
    console.log(username,password)
    // if(username && password) {
    //     connection.query('SELECT * FROM session WHERE username = ? AND password = ?', [username,password], function(error, result, fields){
    //         if(error) throw error
            
    //         if(result.length > 0){
    //             response.send({
    //                 auth: true
    //             })
    //             response.redirect('/dashboard')
    //             console.log("auth ok")
    //         }
    //         else {
    //             response.send({
    //                 auth: false
    //             })
    //             console.log("auth failed")
    //         }
    //         response.end();
    //     })        
    // }

})
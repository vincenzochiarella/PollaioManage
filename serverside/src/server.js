const express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const app = express();
const port = 8080;


var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Pollaio2019*',
	database : 'mydb'
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));

app.listen(port, () => console.log(`Listening on port ${port}`));

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
const express = require('express');
const bodyParser = require('body-parser');
var db = require('./util/database.js');


var pool = db.getPool(); // re-uses existing if already created or creates new one
pool.getConnection(function(err, connection) {
   // don't forget to check error
   connection.query('select 1+1', function(err, rows) {
     // don't forget to check error
     // ...
     // use your data - response from mysql is in rows    
   });
});
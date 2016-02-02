var express = require('express');
var mysql = require('mysql');
var app = express();

app.get("/work", function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Work\n');
});

app.get("/helloworld", function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
});

 var connection = mysql.createConnection({
   host     : '192.168.31.55',
   user     : 'root',
   password : '111111',
   database : 'qwerty'
 });

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

connection.query('CREATE TABLE it_works ( id int )', function(err, rows, fields) {
  if (err) throw err;
});


connection.end();

var server = app.listen(9000, function(){
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
});
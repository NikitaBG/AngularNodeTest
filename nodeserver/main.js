var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
var mysql = require('mysql');
var connection = mysql.createConnection({
   host     : '192.168.31.45',
   user     : 'root',
   password : '111111',
   database : 'node_test'
 });

app.get("/users", function(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	connection.query('SELECT first_name,last_name,phone_number,e_mail FROM users', function(err, results, fields){
		if(err || '') { console.log(err); }
		res.end(JSON.stringify(results));
	});
});

app.post("/users", function(req, res){
	var user = req.body;
	var query = ["UPDATE users SET first_name=",user.first_name," ,last_name=",user.last_name," ,e_mail=",user.e_mail," ,phone_number=",user.phone_number," WHERE id=2"];
	connection.query(query.join("'"), function(err, results, fields){
		if(err || '') { console.log(err); }
	});
	res.writeHead(200);
	res.end();
});

app.put("/users", function(req, res){
	var user = req.body;
	var query = ["INSERT INTO users(first_name, last_name, phone_number, e_mail) VALUES ('" + user.first_name,user.last_name,user.e_mail,user.phone_number + "')"];
	console.log(query.join("','"));
	connection.query(query.join("','"), function(err, results, fields){
		if(err || '') { console.log(err); }
	});
	res.writeHead(200);
	res.end();
});

app.get("/products", function(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	connection.query('SELECT name,price,description,amount FROM products', function(err, results, fields){
		if(err || '') { console.log(err); }
		res.end(JSON.stringify(results));
	});
});
app.post("/products", function(req, res) {
	var product = req.body;
	var query = ["INSERT INTO products(name, price, description, amount) VALUES ('" + product.name,product.price,product.description,product.amount + "')"];
	console.log(query.join("','"));
	connection.query(query.join("','"), function(err, results, fields){
		if(err || '') { console.log(err); }
	});
	res.writeHead(200);
	res.end();
});
app.put("/products", function(req, res) {
	var product = req.body;
	var query = ["UPDATE products SET name=",product.name," ,price=",product.price," ,description=",product.description," ,amount=",product.amount," WHERE id=",1];
	console.log(query.join("','"));
	connection.query(query.join("','"), function(err, results, fields){
		if(err || '') { console.log(err); }
	});
	res.writeHead(200);
	res.end();
});

var server = app.listen(9000, function(){
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
});
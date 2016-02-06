var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var bcrypt = require('bcryptjs'); 
var jwt = require('jwt-simple');
var mysql = require('mysql');
var connection = mysql.createConnection({
   host     : '192.168.31.45',
   user     : 'root',
   password : '111111',
   database : 'node_test'
 });

app.set('jwtTokenSecret','mind_game');

var authJWT = function(req, res, next){
	var token = req.headers["auth-token"];
	if(token){
		try{
			var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
			console.log(decoded);
			if(decoded.uuid && decoded.email && decoded.role && decoded.exp >= Date.now()){
				connection.query("SELECT 1 FROM users WHERE users.uuid='" + decoded.uuid + "' AND  users.email='" + decoded.email + "' AND users.role='" + decoded.role + "'", function(err, results, fields){
					if(results && results[0] && results[0][1]) {
						return next();
					} else 		
						res.writeHead(401);{
						res.end('Not authorized');
					}
				});
			} else {
				res.writeHead(401);
				res.end('Not authorized');
			}
		} catch (err){
			res.writeHead(401);
			res.end('Not authorized');
		}
	} else {
		res.writeHead(401);
		res.end('Not authorized');
	}
};

app.get("/users", authJWT, function(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	connection.query('SELECT uuid,first_name,last_name,phone_number,email FROM users', function(err, results, fields){
		if(err || '') { console.log(err); }
		res.end(JSON.stringify(results));
	});
});

app.put("/users", authJWT, function(req, res){
	var user = req.body;
	var query = ["UPDATE users SET first_name=",user.first_name," ,last_name=",user.last_name," ,email=",user.email," ,phone_number=",user.phone_number," WHERE id=2"];
	connection.query(query.join("'"), function(err, results, fields){
		if(err || '') { console.log(err); }
	});
	res.writeHead(200);
	res.end();
});

app.post("/users", function(req, res){
	var user = req.body;
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash("B4c0/\/", salt, function(err, hash) {
	        var query = ['INSERT INTO users(first_name, last_name, email, phone_number, password, uuid) VALUES ("' + user.first_name,user.last_name,user.email,user.phone_number,hash + '",UUID())'];
			console.log(query);
			connection.query(query.join('","'), function(err, results, fields){
				if(err || '') { 
					res.writeHead(500);
					res.end("SQL TRANSACTION ERROR");
					return;
				}
			}); 
	    });
	});
	res.writeHead(200);
	res.end();
});

app.get("/products", authJWT, function(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	connection.query('SELECT name,price,description,amount FROM products', function(err, results, fields){
		if(err || '') { console.log(err); }
		res.end(JSON.stringify(results));
	});
});
app.post("/products", authJWT, function(req, res) {
	var product = req.body;
	var query = ["INSERT INTO products(name, price, description, amount) VALUES ('" + product.name,product.price,product.description,product.amount + "')"];
	console.log(query.join("','"));
	connection.query(query.join("','"), function(err, results, fields){
		if(err || '') { console.log(err); }
	});
	res.writeHead(200);
	res.end();
});
app.put("/products", authJWT, function(req, res) {
	var product = req.body;
	var query = ["UPDATE products SET name=",product.name," ,price=",product.price," ,description=",product.description," ,amount=",product.amount," WHERE id=",1];
	console.log(query.join("','"));
	connection.query(query.join("','"), function(err, results, fields){
		if(err || '') { console.log(err); }
	});""
	res.writeHead(200);
	res.end();
});

app.post("/login",function(req, res){
	var email = req.body.email || '',
	    password = req.body.password || '';
	if(email == '' && password == ''){
		res.end(400);
	}
	connection.query("SELECT * FROM users WHERE users.email = '" + email + "';", function(err, results, fields){
		bcrypt.compare(req.body.password, results[0].password, function(err, result) {
			if(result){
				res.setHeader("Auth-token", createToken(results[0]));
				res.writeHead(200);
				res.end("Confirm it...");
			} else {
				res.writeHead(401);
				res.end(JSON.stringify({'result':'WRONG PASSWORD'}));
			}
		});
	});
});

var server = app.listen(9000, function(){
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
});

var createToken = function(data){
	var tokenData = {};
	tokenData.uuid = data.uuid;
	tokenData.email = data.email;
	tokenData.role = data.role;
	tokenData.exp = Date.now() + 86400000;
	return jwt.encode(tokenData, app.get('jwtTokenSecret'));
}
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
   host     : 'localhost',
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
			if(decoded.uuid && decoded.email && decoded.role && decoded.exp >= Date.now()){
				connection.query("SELECT 1 FROM users WHERE users.uuid='" + decoded.uuid + "' AND  users.email='" + decoded.email + "' AND users.role='" + decoded.role + "'", function(err, results, fields){
					if(results && results[0] && results[0][1]) {
						res.setHeader("Auth-token", token);
						req.userId = decoded.id;
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

app.get("/api/users", authJWT, function(req, res) {
	connection.query('SELECT uuid,first_name,last_name,phone_number,email FROM users', function(err, results, fields){
		if(err || '') { console.log(err); }
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(results));
	});
});

app.get("/api/users/:userId", authJWT, function(req,res){
	connection.query('SELECT uuid,first_name,last_name,phone_number,email FROM users WHERE users.uuid="' + req.params.userId + '";', function(err, results, fields){
		if(err || '') { console.log(err); }
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify({user: results[0]}));
	});
});

app.get("/api/currentUser", authJWT, function(req, res){
	connection.query("SELECT first_name,last_name,uuid FROM users WHERE users.id=" + req.userId, function(err, results, fields){
		if(err || '') { 
			console.log(err); 
			res.writeHead(500);
			res.end('Server error');
		} else 
		res.writeHead(200);
		res.end(JSON.stringify({user: results[0]}));
	});
});

app.post("/api/updateUser/:userId", authJWT, function(req, res){
	var user = req.body;
	var query = ["UPDATE users SET first_name=",user.first_name," ,last_name=",user.last_name," ,email=",user.email," ,phone_number=",user.phone_number," WHERE uuid='" + req.params.userId + "';"];
	connection.query(query.join("'"), function(err, results, fields){
		if(err || '') { console.log(err); }
	});
	res.writeHead(200);
	res.end();
});
app.get("/api/products", authJWT, function(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	connection.query('SELECT name,price,description,uuid,id FROM products WHERE products.user_id=' + req.userId, function(err, results, fields){
		if(err || '') { console.log(err); } 
		if(!results.length){
			res.end(JSON.stringify({'results':'No data', 'content':[]}));
		}
		res.end(JSON.stringify({'results':'All done', 'content':results}));
	});
});
app.get("/api/products/:productId", authJWT, function(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	connection.query('SELECT name,price,description,uuid FROM products WHERE products.uuid="' + req.params.productId + '";', function(err, results, fields){
		if(err || '') { console.log(err); }
		if(!results.length){
			res.end(JSON.stringify({'results':'No data', 'content':[]}));
		}
		res.end(JSON.stringify({'results':'All done', product: results[0]}));
	});
});
app.post("/api/products/:productId", authJWT, function(req, res) {
	var product = req.body;
	var query;
	if(req.params.productId){
		query = ["UPDATE products SET name=",product.name," ,price=",product.price," ,description=",product.description," WHERE uuid=",req.params.productId,""].join("'");
	} else {
		query = ["INSERT INTO products(name, price, description, uuid, user_id) VALUES ('" + product.name,product.price,product.description + "',UUID()," + req.userId + ")"].join("','");
	}
	connection.query(query, function(err, results, fields){
		if(err || '') { console.log(err); }
	});
	res.writeHead(200);
	res.end();
});
app.post("/api/products", authJWT, function(req, res) {
	var product = req.body;
	var query;
	if(req.params.productId){
		query = ["UPDATE products SET name=",product.name," ,price=",product.price," ,description=",product.description," WHERE uuid=",req.params.productId,""].join("'");
	} else {
		query = ["INSERT INTO products(name, price, description, uuid, user_id) VALUES ('" + product.name,product.price,product.description + "',UUID()," + req.userId + ")"].join("','");
	}
	connection.query(query, function(err, results, fields){
		if(err || '') { console.log(err); }
	});
	res.writeHead(200);
	res.end();
});
app.post("/api/deleteProducts", authJWT, function(req, res) {
	if(!req.body.uuids && !req.body.uuids.length){
		res.writeHead(404);
		res.end({"result":"No uuid."});
	} else {
		var query = "DELETE FROM products WHERE products.uuid IN ('" + req.body.uuids.join("','") + "')";
		connection.query(query, function(err, results, fields){
			if(err || '') { console.log(err); }
		});
		res.writeHead(200);
		res.end(JSON.stringify({"result":"Deleted."}));
	}
});

app.post("/api/login",function(req, res){
	var email = req.body.email || '',
	    password = req.body.password || '';
	if(email == '' && password == ''){
		res.end(400);
	}
	connection.query("SELECT * FROM users WHERE users.email = '" + email + "';", function(err, results, fields){
		if(err || '') {console.log(err);}
		if(results.length){
			bcrypt.compare(req.body.password, results[0].password, function(err, result) {
				if(result){
					res.setHeader("Auth-token", createToken(results[0]));
					res.writeHead(200);
					res.end(JSON.stringify({'token':createToken(results[0])}));
				} else {
					res.writeHead(404);
					res.end(JSON.stringify({'errorMessage':'Entered wrong password.'}));
				}
			});
		} else {
			res.writeHead(404);
			res.end(JSON.stringify({'errorMessage':"User with this email doesn't exists."}));
		}
	});
});

app.post("/api/signIn", function(req, res){
	var user = req.body;
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(user.password, salt, function(err, hash) {
	        var query = ['INSERT INTO users(first_name, last_name, email, phone_number, password, uuid) VALUES ("' + user.first_name,user.last_name,user.email,user.phone_number,hash + '",UUID())'];
			connection.query(query.join('","'), function(err, results, fields){
				if(err || '') { 
					console.log(err);
					res.writeHead(500);
					res.end("SQL TRANSACTION ERROR");
					return;
				}
				connection.query("SELECT * FROM users WHERE users.email = '" + user.email + "';", function(err, results, fields){
					if(err || '') {console.log(err);}
					if(results.length){
						bcrypt.compare(user.password, results[0].password, function(err, result) {
							if(result){
								res.setHeader("Auth-token", createToken(results[0]));
								res.writeHead(200);
								res.end(JSON.stringify({'token':createToken(results[0])}));
							} else {
								res.writeHead(401);
								res.end(JSON.stringify({'result':'WRONG PASSWORD'}));
							}
						});
					} else {
						res.writeHead(404);
						res.end(JSON.stringify({'result':"User with this email doesn't exists."}));
					}
				});
			}); 
	    });
	});
});

app.post("/api/updatePassword", authJWT, function(req, res){
	var body = req.body;
	if(!body){
		res.writeHead(404);
		res.end(JSON.stringify({'result':"Incorrect request body"}));
	}
	console.log(body);
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(body.password, salt, function(err, hash) {
	        var query = 'UPDATE users SET password="' + hash + '"  WHERE users.uuid="' + body.uuid + '";';
	        console.log(query);
			connection.query(query, function(err, results, fields){
				if(err || '') { 
					console.log(err);
					res.writeHead(500);
					res.end("SQL TRANSACTION ERROR");
					return;
				} else {
					res.writeHead(200);
					res.end(JSON.stringify({result: "Password changed."}))
				}
			}); 
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
	tokenData.id = data.id;
	tokenData.exp = Date.now() + 86400000;
	return jwt.encode(tokenData, app.get('jwtTokenSecret'));
}
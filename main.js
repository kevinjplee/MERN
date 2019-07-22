// JavaScript source code
var express = require('express')
var http = require('http');
var mysql = require('mysql');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'root11',
	database : 'school'
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname, '/views', 'login.html'));
});

app.post('/auth', function(request, response){
	var email = request.body.email;
	var password = request.body.password;

	if (email && password) {
		connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(error, results, fields){
		if (results.length > 0){
			request.session.loggedin = true;
			request.session.username = username;
			response.redirect();
		} else{
			response.send('Incorrect email address and password. <p><a href = "/"> Home </a></p>');
		}
		response.end();
		});
	} else{
		response.send('Please enter Username and Password <p><a href = "/"> Home </a></p>');
		response.end();
	}
});

app.listen(3000);
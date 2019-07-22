// JavaScript source code
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
var mysql =require('mysql');
const validator = require('validator');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'school'
});

connection.connect();

const client = new MongoClient(db, {useNewUrlParser:true});
client.connect(err=> {
    console.log("MongoDB connected.")
    const collection =client.db("mern").collection("mern");

    collection.insertMany([{a:1},{b:1},{c:1}], function (err,r){
        collection.updateMany({a:1},{$set:{d:1}, $unset:{a:""}},{upsert:true}, function(err,r){
            collection.deleteMany({c:1}, function(err,r){
                collection.find({}).toArray(function(err,docs){
                    console.log(docs);
                    client.close();
                });
                
            });
        });
    });
});

const port = process.env.PORT || 3001;

app.use(logger('dev'));

app.get('/', (req, res) => {

	res.json({message:'Hello, World!'});
});

app.post('/logindata', (req,res) => {
    const {id, password} = req.body;
    connection.query('SELECT * FROM accounts WHERE `id` =?', id,function(err,rows){
        const user = rows[0];
        if(!user){
            return res.json({success:false, result:"Incorrect username"});
        }
        else if(user.password !== password){
            return res.json({success:false, result:"Incorrect password"});
        }
        else if(user.password === password){
            return res.json({success:true});
        }
    });
});

app.post('/gradedata',(req,res) => {
    const {id} = req.body;
    console.log(id);
    connection.query('SELECT * FROM studentGrade WHERE `id` = ?', id, function(err, result){
        if(err){
            console.log(err);
        }
        else if(result.length === 0){
            return res.json({success: false});
        }
        else{
            var gradeArray = [];
            for(let i = 0; i < result.length; i++){
                gradeArray.push({FormId: i, name: result[i].name, credit: result[i].credit,
                            type: result[i].type, grade: result[i].grade})
            }
            return res.json({success: true, result: gradeArray});
        }
    })
})


function checkIdDuplicate(input, callback){
    const selectCommand = 'SELECT id from accounts where id = ?';
    connection.query(selectCommand,input,function(err,result){
        if(err) {
            console.log(error);
        return;
    }else{
        return callback(result.length);
    }
    })
}

/*
function checkEmailDuplicate(input, callback){
    const selectCommand = 'SELECT email From accounts Where email = ?';
    connection.query(selectCommand,input,function(err,result){
        if(err) {
            console.log(error);
        return;
    }else{
        return callback(result.length);
    }
    })
}
*/

app.post('/registerdata', (req,res) => {
    const {id, password, name, major, email} = req.body;

    if(!validator.isAlphanumeric(id) || !validator.isLength(id,{min:4, max:15})){
        return res.json({success:false, error: "Enter a valid id"});
    } else if(!validator.isLength(password, {min:6, max:15})){
        return res.json({success:false, error: "Enter a valid password."});
    } else if(!validator.isLength(name, {min:1})){
        return res.json({success: false, error: "Name cannot be blank."});
    } else if(!validator.isLength(major,{min:1})){
        return res.json({success:false, error: "Major cannot be blank"});
    } else if(!validator.isEmail(email)){
        return res.json({success: false, error:"Enter a valid email address"});
    } else{
        checkIdDuplicate(id, function(result){
            if(result > 0){
                return res.json({success: false, error: "Id already exists"})
            }
            else{
                
            const insertCommand = 'INSERT INTO accounts (id, password, name, major, email) VALUES(?,?,?,?,?)';
            const insertVal = [id, password, name, major, email];

            connection.query(insertCommand,insertVal,function(err,rows){
               if(err) {
                console.log(err);
                return;
                }
                else{
                    return res.json({success:true});
                }
            });
        }
    });

    }
});

app.listen(port, () => console.log(`Listening on Port ${port}`));
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
const Mongodb = require('mongodb');

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
});

const port = process.env.PORT || 3001;

app.use(logger('dev'));

app.get('/', (req, res) => {

	res.json({message:'Hello, World!'});
});

app.post('/logindata', (req,res) => {
    const {id, password} = req.body;
    const collection = client.db("mern").collection("accounts");

    collection.find({'id': id}).toArray()
    .then(item =>{
        console.log(item)
        const user = item[0];
        if(!user){
            return res.json({success:false, result:"Incorrect username"});
        }
        else if(user.password !== password){
            return res.json({success:false, result:"Incorrect password"});
        }
        else if(user.password === password){
            return res.json({success:true});
        }
    })
    .catch(err => {
        console.error(err)
    })
});

app.post('/deletegrade',(req,res)=>{
    const {_id} = req.body;
    const collection = client.db("mern").collection("StudentGrade");
    collection.deleteOne({'_id': Mongodb.ObjectID(_id)})
    .then(data => {
        console.log("deleted");
    return res.json({success : true});
    })
    .catch(err => {
        console.log(err);
        return res.json({success:false});
    })
})

app.post('/gradedata', (req,res) => {
const id = req.body.id;
const {name, credit, type, grade} = req.body.data;
const collection = client.db("mern").collection("StudentGrade");
collection.insertOne({'id':id,'name':name,'credit':credit,'type':type,'grade':grade})
.then(data =>{
    console.log(data.ops[0])
    return res.json(data.ops[0]);
}
)
.catch(err => console.log(err))
})

app.get('/gradedata',(req,res) => {
    const {id} = req.query;
    console.log(id);
    const collection = client.db("mern").collection("StudentGrade");
    collection.find({'id':id}).toArray()
    .then(data =>{
        if(data.length === 0){
            return res.json({success: false});
        }
        else{
            var gradeArray = [];
            for(let i = 0; i < data.length; i++){
                gradeArray.push({_id: data[i]._id, name: data[i].name, credit: data[i].credit,
                            type: data[i].type, grade: data[i].grade})
            }
            return res.json({success: true, result: gradeArray});
        }
    })
    .catch(err=> console.log(err))
})


function checkIdDuplicate(input, callback){
    const collection = client.db("mern").collection("accounts");
    collection.findOne({'id':input})
    .then(item =>{
        if(!item){
            return callback(0);
        }
        else{
        return callback(item.length);
        }
    })
    .catch(err => {
        console.error(err)
    })
}

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
            const collection = client.db("mern").collection("accounts");
            collection.insertOne({'id':id, 'password':password, 'name': name, 
                                  'major':major,'email':email})
            .then(result=> {
                return res.json({success:true});
            })
            .catch(err=> console.log(err))
        }
    });}
});

app.listen(port, () => console.log(`Listening on Port ${port}`));
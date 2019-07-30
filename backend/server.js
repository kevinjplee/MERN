// JavaScript source code
const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session');
const logger = require('morgan');
const validator = require('validator');
const MongoClient = require('mongodb').MongoClient;
const Mongodb = require('mongodb');
const socket = require('socket.io');
const app = express();
const port = process.env.PORT || 3001;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");
const passport = require("passport");

app.use(passport.initialize());
require("./validation/passport")(passport);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

const client = new MongoClient(db, {useNewUrlParser:true});
client.connect(err=> {
    console.log("MongoDB connected.")
});

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
            return res.json({success:false, result:"존재하지 않는 아이디입니다."});
        }
        else {
            bcrypt.compare(password, user.password)
            .then(isMatch =>{
                if(isMatch){
                    const payload = {
                        id: user.id,
                        name: user.name
                    };

                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 31556826
                        },
                        (err,token) => {
                            res.json({
                                success:true,
                                token:"Bearer " + token
                            });
                        }
                    );
                } else {
                    res.json({success:false, result: "비밀번호를 다시 입력해주세요."});
                }
            })
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
/*
function checkEmpty(input, name, callback){
    if(validator.isEmpty(input)){
        return callback({success: false, error: '${name} is Empty'})
    }
}
*/
app.post('/gradedata', (req,res) => {
    console.log(req.body.data);
if(req.body.data === null){
    return res.json({success:false});
}
else{
const id = req.body.id;
const {name, credit, type, grade} = req.body.data;
const collection = client.db("mern").collection("StudentGrade");
collection.insertOne({'id':id,'name':name,'credit':credit,'type':type,'grade':grade})
.then(data =>{
    console.log(data.ops[0])
    return res.json({success: true, data: data.ops[0]});
}
)
.catch(err => console.log(err))}
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

app.post('/modifygrade', (req,res)=>{
    console.log(req.body);
    const{_id, name, credit, type, grade} = req.body;
    const collection = client.db("mern").collection("StudentGrade");
    collection.findOneAndUpdate({'_id': Mongodb.ObjectID(_id)},{$set:{'name':name,
    'credit':credit,'type':type,'grade':grade}})
    .then(data =>{
        console.log(data);
        if(data){
            return res.json({success: true});
        }
        else{
            return res.json({success:false});
        }
    })
    .catch(err =>{
        console.log(err);
    })
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
            bcrypt.genSalt(10, (err,salt) =>{
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) console.log(err)
                    console.log(hash);
                    const collection = client.db("mern").collection("accounts");
                    collection.insertOne({'id':id, 'password':hash, 'name': name, 
                                          'major':major,'email':email})
                    .then(result=> {
                        return res.json({success:true});
                    })
                    .catch(err=> console.log(err))      
                })
            })
            
        }
    });}
});

server = app.listen(port, () => console.log(`Listening on Port ${port}`));

io = socket(server);

io.on('connection', (socket) =>{
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        console.log(data);
        io.emit('RECEIVE_MESSAGE', data);
    })
});

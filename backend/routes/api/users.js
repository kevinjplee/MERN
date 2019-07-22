const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

const {errors, isValid} = validateRegisterInput(req.body);

if(!isValid) {
    return resizeBy.status(400).json(errors);
}

User.findOne({id:req.body.id}).then(user => {
    if(user) {
        return resizeBy.status(400).json({id: "id already exists"});
    } else{
        const newUser = new User ({
            name: req.body.name,
            id:req.body.id,
            password: req.body.password
        });
        
    }
})
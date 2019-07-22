const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.id = !isEmtpy(data.id)? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    if(Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    if(Validator.isEmpty(data.id)) {
        errors.id = "ID field is required";
    }

    if(Validator.isEmpty(data.password)) {
        errors.name = "Password field is required";
    }

    if(Validator.isEmpty(data.password2)) {
        errors.name = "Confirm Password field is required";
    }

    if(!Validator.isLength(data.password, {min:6, max:30})){
        errors.password = "Password must be at least 6 characters";
    }

    if(!validator.equals(data.password, data.password2)){
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
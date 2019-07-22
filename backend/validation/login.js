const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.id = !isEmpty(data.id) ? data.id : "";
  data.password = !isEmpty(data.password) ? data.password : "";
// Email checks
  if (Validator.isEmpty(data.id)) {
    errors.id = "ID field is required";
  } else if (!Validator.isEmail(data.id)) {
    errors.id = "ID is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};
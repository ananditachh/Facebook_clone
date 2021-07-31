const Validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validatePasswordInput(data){
  let errors = {};
  if (!Validator.isLength(data.password, {min: 6, max: 30}))
  {
    errors.password = 'Password must be between 6 and 30 characters';
  }

  if (isEmpty(data.password)){
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
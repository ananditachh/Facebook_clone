const Validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateNameInput(data){
  let errors = {};
  if (!Validator.isLength(data.name, {min: 3, max: 30}))
  {
    errors.password = 'Name must be minimum of 3 characters to search';
  }

  if (isEmpty(data.name)){
    errors.password = 'name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
const mongoose = require('mongoose');
const Joi = require('joi');

const CustomerModel = mongoose.model('Customer', new mongoose.Schema({
  isGold: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 64,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 16,
  }
}));

function validateCustomer(customer) {
  const schema = {
    isGold: Joi.boolean().required(),
    name: Joi.string().min(4).max(64).required(),
    phone: Joi.string().min(10).max(16).required()
  };
  return Joi.validate(customer, schema);
}

exports.Customer = CustomerModel;
exports.validate = validateCustomer;

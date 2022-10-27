const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const customerSchema = new mongoose.Schema({
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
  },
});
const Customer = mongoose.model("Customer", customerSchema);

function validate(customer) {
  const schema = Joi.object({
    isGold: Joi.boolean().required(),
    name: Joi.string().min(4).max(64).required(),
    phone: Joi.string().min(10).max(16).required(),
  });
  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validate;
exports.customerSchema = customerSchema;

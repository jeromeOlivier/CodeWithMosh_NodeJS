const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 128,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 128,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 256,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(128).required(),
    email: Joi.string().max(128).required().email(),
    password: Joi.string().min(4).max(256).required(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validate;

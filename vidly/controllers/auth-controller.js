const jwt = require("jsonwebtoken");
const { User } = require("../models/user-model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
require("dotenv").config();
exports.create = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Authentication failed");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Authentication failed");

  const token = jwt.sign({ _id: user._id }, process.env.JWT);
  res.send(token);
};

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().max(128).required().email(),
    password: Joi.string().min(4).max(256).required(),
  });
  return schema.validate(req);
}

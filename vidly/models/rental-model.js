const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  rentalPeriod: 0,
});

const Rental = mongoose.model("Rental", rentalSchema);

function validate(rental) {
  const schema = {
    movieId: Joi.string().required(),
    customerId: Joi.string().required(),
    rentalPeriod: Joi.number().min(1).max(3).required(),
  };
  return Joi.validate(rental, schema);
}

exports.rentalSchema = rentalSchema;
exports.Rental = Rental;
exports.validate = validate;

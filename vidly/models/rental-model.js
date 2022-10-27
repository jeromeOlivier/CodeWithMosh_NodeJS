const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const rentalSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

function validate(rental) {
  const schema = Joi.object({
    movieId: Joi.objectId(),
    customerId: Joi.objectId(),
  });
  return schema.validate(rental);
}

exports.rentalSchema = rentalSchema;
exports.Rental = Rental;
exports.validate = validate;

const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { genreSchema } = require("./genre-model");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 128,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 32,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 32,
  },
});
const Movie = mongoose.model("Movie", movieSchema);

function validate(movie) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(128).required(),
    genreId: Joi.objectId(),
    numberInStock: Joi.number().min(0).max(32).required(),
    dailyRentalRate: Joi.number().min(0).max(32).required(),
  });
  return schema.validate(movie);
}

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validate = validate;

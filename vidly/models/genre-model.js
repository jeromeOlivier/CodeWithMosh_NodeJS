const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 24,
    lowercase: true,
    trim: true,
  },
});

const GenreModel = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(6).max(24).required(),
  });
  return schema.validate(genre);
}

exports.genreSchema = genreSchema;
exports.Genre = GenreModel;
exports.validate = validateGenre;

const mongoose = require('mongoose');
const Joi = require('joi')

const GenreModel = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 24,
    lowercase: true,
    trim: true,
  }
}));

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(6).max(24).required()
  };
  return Joi.validate(genre, schema);
}

exports.Genre = GenreModel;
exports.validate = validateGenre;

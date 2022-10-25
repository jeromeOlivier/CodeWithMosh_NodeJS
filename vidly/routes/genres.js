const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose')

// Schema ----------------------------------------------------------------------
const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 24,
    lowercase: true,
    trim: true,
  }
}));

// Create ----------------------------------------------------------------------
router.post('/', async (req, res) => {
  // Validate
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

// Read ------------------------------------------------------------------------
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
});

router.get('/:id', (req, res) => {
  const genre = Genre.findById(req.params.id);
  if (!genre) res.status(404).send('Genre not found.');
  res.send(genre);
});

// Update ----------------------------------------------------------------------
router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {new: true}
  )
  if (!genre) return res.status(404).send('Genre not found.');

  res.send(genre);
});

// Delete ----------------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('Genre not found.');

  res.send(genre);
});

// Validate --------------------------------------------------------------------
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(genre, schema);
}

module.exports = router;

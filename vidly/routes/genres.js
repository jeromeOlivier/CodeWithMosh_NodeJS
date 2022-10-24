const express = require('express');
const router = express.Router();
const Joi = require('joi');

// DATA ------------------------------------------------------------------------
const genres = [
  { id: 1, name: 'comedy' },
  { id: 2, name: 'thriller' },
  { id: 3, name: 'fantasy' },
  { id: 4, name: 'horror' },
  { id: 5, name: 'romance' },
  { id: 6, name: 'drama' }
];

// CREATE ----------------------------------------------------------------------
router.post('/', (req, res) => {
  // Validate
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  // Save
  genres.push(genre);
  res.send(genre);
});

// READ ------------------------------------------------------------------------
router.get('/', (req, res) => {
  if (genres.length === 0) return res.status(404).send('No genres found.');
  if (req.query.sortBy !== undefined) {
    const sorted = genres.sort((a, b) => a.name > b.name ? 1 : -1);
    return res.send(sorted);
  }
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) res.status(404).send('Genre not found.');
  res.send(genre);
});

// UPDATE ----------------------------------------------------------------------
router.put('/:id', (req, res) => {
  // confirm existence
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found.');

  // validate
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // update
  genre.name = req.body.name;
  res.send(genre);
});

// DELETE ----------------------------------------------------------------------
router.delete('/:id', (req, res) => {
  // confirm existence
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found.');

  // delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  // return
  res.send(genre);
});

// VALIDATE --------------------------------------------------------------------
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(genre, schema);
}

module.exports = router;

const { validate, Genre } = require("../models/genre-model");

exports.create = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
};

exports.findAll = async (req, res, next) => {
  try {
    const genres = await Genre.find().sort("name");
    res.send(genres);
  } catch (e) {
    next(e);
  }
};

exports.findById = async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) res.status(404).send("Genre not found.");
  res.send(genre);
};

exports.update = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send("Genre not found.");
  res.send(genre);
};

exports.deleteOne = async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send("Genre not found.");

  res.send(genre);
};

const { validate, Rental } = require("../models/rental-model");
const { Movie } = require("../models/movie-model");
const { Customer } = require("../models/customer-model");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("Movie not found");

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send("Customer not found");

  const rentalPeriod = req.body.rentalPeriod;

  const rental = new Rental({
    movie,
    customer,
    rentalPeriod,
  });

  const result = await rental.save();
  res.send(result);
};

exports.findAll = async (req, res) => {
  const rentals = await Rental.find()
    .populate("movie", "title -_id genre")
    .populate("customer", "name -_id")
    .select("title name");
  res.send(rentals);
};

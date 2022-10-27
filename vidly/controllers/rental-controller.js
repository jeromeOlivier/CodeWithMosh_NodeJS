const { validate, Rental } = require("../models/rental-model");
const { Movie } = require("../models/movie-model");
const { Customer } = require("../models/customer-model");

exports.create = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("Movie not found");

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send("Customer not found");

  if (movie.numberInStock === 0) return res.status(400).send("Not available");

  const rental = new Rental({
    movie,
    customer,
    dateOut: Date.now(),
  });

  // transaction code requires a replicated DB (need to create on local)
  // try {
  //   const session = await mongoose.startSession();
  //   await session.withTransaction(async () => {
  //     const result = await rental.save();
  //     movie.numberInStock--;
  //     movie.save();
  //     res.send(result);
  //   });
  //
  //   session.endSession();
  //   console.log("success");
  // } catch (error) {
  //   console.log("error111", error.message);
  // }

  const result = await rental.save();
  movie.numberInStock--;
  movie.save();
  res.send(result);
};

exports.findAll = async (req, res) => {
  const rentals = await Rental.find()
    .populate("movie", "title -_id genre")
    .populate("customer", "name -_id")
    .select("title name")
    .sort("-dateOut");
  res.send(rentals);
};

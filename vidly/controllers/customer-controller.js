const { validate, Customer } = require('../models/customer-model')

// Create ----------------------------------------------------------------------
exports.create = (async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});

// Read ------------------------------------------------------------------------
exports.findById = (async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) res.status(404).send('Customer not found.');
  res.send(customer);
});

exports.findAll = (async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

// Update ----------------------------------------------------------------------
exports.update = (async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    },
    {
      new: true,
    },
  );
  if (!customer) return res.status(404).send('Customer not found.');
  res.send(customer);
});

// Delete ----------------------------------------------------------------------
exports.deleteOne = (async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('Customer not found.');

  res.send(customer);
});

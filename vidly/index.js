const express = require('express');
const app = express();
require('dotenv').config();

const genres = require('./routes/genre-route');
const customers = require('./routes/customer-route');
const hello = require('./routes/hello-route');

const mongoose = require('mongoose');
const { application } = require('express')
mongoose.connect(
  'mongodb://localhost/vidly',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.error('MongoDB connection failed'));

app.use(express.json());
app.use('/', hello);
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

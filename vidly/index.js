const express = require('express');
const app = express();
require('dotenv').config();

const genres = require('./routes/genres');
const hello = require('./routes/hello');

const mongoose = require('mongoose');
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

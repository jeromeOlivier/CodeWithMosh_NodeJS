const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
require('dotenv').config();

mongoose.connect(
  'mongodb://localhost/vidly',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.error('MongoDB connection failed'));

app.use('/', require('./routes/hello'));
app.use('api/genres', require('./routes/genres'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const debug = require('debug')('app:startup');
const config = require('config');
const Joi = require('joi');
const logger = require('./middleware/logger');
const auth = require('./authentication');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/main');

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(auth);
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/courses', courses);
app.use('/', home);

// PORT ------------------------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${ port }!`);
});

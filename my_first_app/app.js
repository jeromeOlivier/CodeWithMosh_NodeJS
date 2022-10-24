// const log = require('./logger.js')
//
// log('hello')
//
// const os = require('os');
// const fs = require('fs');
//
// const totalMemory = os.totalmem();
// const freeMemory = os.freemem();
// const files = fs.readdirSync('./');
// console.log(`Total Memory: ${totalMemory.toLocaleString()}`);
// console.log(`Free Memory: ${freeMemory.toLocaleString()}`);
// fs.readdir('./', function(err, files) {
//   if (err) console.log('Error', err);
//   else console.log('Files', files);
// });

/*
const Logger = require('./logger.js');
const logger = new Logger();

// Register a listener
logger.on('messageLogged', (arg) => {
  console.log('Listener called', arg);
});

// Raise an event
logger.log('hello there this is a message');
*/

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World');
    res.end();
  }
  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.listen(3000);

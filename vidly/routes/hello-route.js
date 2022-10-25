const express = require('express');
const router = express.Router();
const { hello } = require('../controllers/hello-controller')

router.get('/', hello);

module.exports = router;

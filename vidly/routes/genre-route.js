const express = require('express');
const router = express.Router();
const {
  create,
  findById,
  findAll,
  update,
  deleteOne
} = require('../controllers/genre-controller');

router.post('/', create);
router.get('/', findAll);
router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', deleteOne);

module.exports = router;

const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

// CREATE ----------------------------------------------------------------------
router.post('/', (req, res) => {
  // Validate
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Create
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  // Save
  courses.push(course);
  res.send(course);
});

// READ -----------------------------------------------------------------------
router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the given ID was not found.');
  res.send(course);
});

// UPDATE ----------------------------------------------------------------------
router.put('/:id', (req, res) => {
  // confirm existence
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');
  // validate
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // update
  course.name = req.body.name;
  res.send(course);

})

// DELETE ----------------------------------------------------------------------
router.delete('/:id', (req, res) => {
  // confirm existence
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('ID not found.');
  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

// VALIDATION ------------------------------------------------------------------

function validateCourse(course) {
  const schema = { name: Joi.string().min(3).required() };
  return Joi.validate(course, schema);
}

module.exports = router;

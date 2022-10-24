const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => console.log('Connected to db'))
.catch(err => console.error('Could not connect to db', err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    // match: /pattern/ // (for regex)
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network']
  },
  author: String,
  date: {type: Date, default: Date.now()},
  isPublished: Boolean,
  price: Number,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 1000);
      },
      message: 'A course should have at least one tag'
    }
  },
  price: {
    type: Number,
    required: function() { return this.isPublished; }
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Something',
    author: 'Joe Blow',
    tags: ['indecisive', 'hesitant'],
    category: '9',
    isPublished: true,
    price: 15
  });

  try {
    const result = await course.save();
    console.log(result)
  } catch (err) {
    for (let field in err.errors) {
      console.log(err.errors[field].message)
    }
  }
}

// async function getCourses() {
//     const pageNumber = 2;
//     const pageSize = 10;
//     const courses = await Course
//         .find({author: 'Mosh'})
//         .skip((pageNumber - 1) * pageSize)
//         .limit(pageSize)
//         .sort({name: 1})
//         .select({name: 1, tags: 1, _id: 0});
//     // .countDocuments()
//     console.log(courses);
// }

createCourse();

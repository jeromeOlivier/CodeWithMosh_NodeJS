const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => console.log('Connected to db'))
    .catch(err => console.error('Could not connect to db', err));

const courseSchema = new mongoose.Schema({
    author: {type: String, required: true},
    date: { type: Date, default: Date.now() },
    isPublished: Boolean,
    name: String,
    price: Number,
    tags: [ String ]
});

const Course = mongoose.model('Course', courseSchema);

// async function getCourses() {
//     return Course
//         .find({ isPublished: true, tags: 'backend' })
//         .sort({name: 1})
//         .select({name:1, author: 1, _id: 0});
// }

// async function getCourses() {
//     return Course
//         .find({ isPublished: true })
//         .or([{tags:'backend'}, {tags:'frontend'}])
//         .sort({price: -1, name: 1})
//         .select({name: 1, author: 1, price: 1, _id: 0});
// }

// async function getCourses() {
//     return Course
//         .find({isPublished: true})
//         .or([{price: {$gte: 15}}, {name: /.*by.*/i}])
//         .select({name: 1, isPublished:1, price: 1, _id: 0})
// }

// query first approach
// async function updateCourse(id) {
//     const course = await Course.findById(id);
//     console.log(course);
//     if (!course) return;
//     course.set({
//         isPublished: true,
//         author: 'Ronald'
//     });
//     const result = await course.save();
//     console.log(result)
// }

// direct approach
// async function updateCourse(id) {
//     const result = await Course.updateOne({ _id: id }, {
//         $set: {
//             author: 'Jesus',
//             isPublished: false
//         }
//     });
//     console.log(result)
// }

// async function updateCourse(id) {
//     const course = await Course.findByIdAndUpdate(id, {
//         $set: {
//             author: 'Daffy Duck',
//             isPublished: false
//         }
//     }, { new: true });
//     console.log(course)
// }
//
// updateCourse('63556966b5f7a5a3d1039b2c').then(r => {});

async function removeCourse(id) {
    const result = await Course.deleteOne({_id: id });
    console.log(result);
}

removeCourse('63556966b5f7a5a3d1039b32').then();

// async function run() {
//     const courses = await getCourses()
//     console.log(courses);
// }
//
// run().then(() => {})

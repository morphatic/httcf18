const courses = require('./courses/courses.service.js');
const students = require('./students/students.service.js');
const subjects = require('./subjects/subjects.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(courses);
  app.configure(students);
  app.configure(subjects);
};

// Initializes the `courses` service on path `/courses`
const createService = require('feathers-knex');
const createModel = require('../../models/courses.model');
const hooks = require('./courses.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'courses',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/courses', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('courses');

  service.hooks(hooks);
};
  
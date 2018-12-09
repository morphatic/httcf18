

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      // add related courses to the courses_subjects table
      async function(context) {
        if ("undefined" !== typeof context.data.courses) {
          // get the data we want to add to the join table
          const courses = context.data.courses;
          // remove the courses property from the data
          delete context.data.courses;
          // get the knex db client
          const knex = context.app.get('knexClient');
          // create the raw queries to modify courses_subjects
          await knex.raw(
            `DELETE FROM courses_subjects WHERE subject_id = ${context.id};`
          );
          courses.forEach(async c => {
            await knex.raw(
              `INSERT INTO courses_subjects (subject_id, course_id) ` +
              `VALUES (${context.id}, ${c});`
            );
          })
        }
        return context;
      }
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [
      // get all courses related to this subject
      async function(context) {
        // write our sql
        const sql = `SELECT c.id, c.code
                     FROM   courses_subjects cs, courses c
                     WHERE  cs.course_id = c.id AND
                            cs.subject_id = ?`;
        // get the knex db client
        const knex = context.app.get('knexClient');
        // run our query
        const result = await knex.raw(sql, [context.id]);
        // add our results to the previous result
        context.result['courses'] = result;
        return context;
      }
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

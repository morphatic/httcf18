

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      // add related courses to the courses_students table
      async function(context) {
        if ("undefined" !== typeof context.data.courses) {
          // get the data we want to add to the join table
          const courses = context.data.courses;
          // remove the courses property from the data
          delete context.data.courses;
          // get the knex db client
          const knex = context.app.get('knexClient');
          // create the raw queries to modify courses_students
          await knex.raw(
            `DELETE FROM courses_students WHERE student_id = ${context.id};`
          );
          courses.forEach(async c => {
            await knex.raw(
              `INSERT INTO courses_students (student_id, course_id) ` +
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
      // get all courses related to this student
      async function(context) {
        // write our sql
        const sql = `SELECT c.id, c.code
                     FROM   courses_students cs, courses c
                     WHERE  cs.course_id = c.id AND
                            cs.student_id = ?`;
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

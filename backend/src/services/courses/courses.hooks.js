

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      // add related subjects to the courses_subjects table
      async function(context) {
        if ("undefined" !== typeof context.data.subjects) {
          // get the data we want to add to the join table
          const subjects = context.data.subjects;
          // remove the subjects property from the data
          delete context.data.subjects;
          // get the knex db client
          const knex = context.app.get('knexClient');
          // create the raw queries to modify courses_subjects
          await knex.raw(
            `DELETE FROM courses_subjects WHERE course_id = ${context.id};`
          );
          subjects.forEach(async s => {
            await knex.raw(
              `INSERT INTO courses_subjects (course_id, subject_id) ` +
              `VALUES (${context.id}, ${s});`
            );
          })
        }
        return context;
      },
      // add related students to the courses_students table
      async function(context) {
        if ("undefined" !== typeof context.data.students) {
          // get the data we want to add to the join table
          const students = context.data.students;
          // remove the students property from the data
          delete context.data.students;
          // get the knex db client
          const knex = context.app.get('knexClient');
          // create the raw queries to modify courses_students
          await knex.raw(
            `DELETE FROM courses_students WHERE course_id = ${context.id};`
          );
          students.forEach(async s => {
            await knex.raw(
              `INSERT INTO courses_students (course_id, student_id) ` +
              `VALUES (${context.id}, ${s});`
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
      // get all subjects related to this course
      async function(context) {
        // write our sql
        const sql = `SELECT s.id, s.code
                     FROM   courses_subjects cs, subjects s
                     WHERE  cs.subject_id = s.id AND
                            cs.course_id = ?`;
        // get the db client (Express global)
        const knex = context.app.get('knexClient');
        // run our query
        const result = await knex.raw(sql, [context.id]);
        // add our results to the previous result
        context.result['subjects'] = result;
        return context;
      },
      // get all students related to this course
      async function(context) {
        // write our sql
        const sql = `SELECT s.id, s.first_name, s.last_name
                     FROM   courses_students cs, students s
                     WHERE  cs.student_id = s.id AND
                            cs.course_id = ?`;
        // get the db client (Express global)
        const knex = context.app.get('knexClient');
        // run our query
        const result = await knex.raw(sql, [context.id]);
        // add our results to the previous result
        context.result['students'] = result;
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

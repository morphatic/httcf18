// import the students service from feathers
import { students } from "@/services/feathers";

/**
 * addStudent(student)
 * 
 * This function will attempt to add a new student to the 
 * database. In the event that there is a problem, an error
 * will be returned. Otherwise, the newly added student 
 * object will be returned.
 * 
 * @param  {object} student The student to be created
 * @return {object}         The student that was created
 */
export const addStudent = async student => await students.create(student);

/**
 * getStudents(query)
 * 
 * This function will query the database and retrieve
 * a list of students. For details on the syntax of
 * the `query` parameter, see the feathersjs documentation
 * for the `find()` function:
 * https://docs.feathersjs.com/api/databases/querying.html
 * 
 * @param  {object} query Any additional standard feathers params
 * @return {object}       A paginated feathers query result
 */
export const getStudents = async query => {
  // make sure the query parameter has a default value
  query = query || {};
  // execute and return the query results
  return await students.find(query);
};

/**
 * getStudent(id, params)
 * 
 * This function gets a fully "hydrated" student object, i.e.
 * in addition to the basic student info (fn, ln, dob, gender, etc.),
 * it will also get all the course in which the student is enrolled.
 * In other words it returns a student along with all of its 
 * associated data.
 * 
 * @param  {number} id     The ID of the student to be retrieved
 * @param  {object} params Any additional feathers query params
 * @return {object}        The hydrated student object retrieved
 */
export const getStudent = async (id, params) => {
  // make sure a student ID was specified
  if ("undefined" === typeof id) {
    throw new Error("Please provide a valid student ID.");
  }
  params = params || {};
  return await students.get(id, params);
};


/**
 * updateStudent(id, student, params)
 * 
 * This function updates the data associated with a student.
 * 
 * @param  {number} id      The ID of the student to be retrieved
 * @param  {object} student The student data to be updated
 * @param  {object} params  Any additional feathers query params
 * @return {object}         The updated student object
 */
export const updateStudent = async (id, student, params) => {
  // make sure a student ID was specified
  if ("undefined" === typeof id) {
    throw new Error("Please provide a valid student ID.");
  }
  params = params || {};
  return await students.patch(id, student, params);
}
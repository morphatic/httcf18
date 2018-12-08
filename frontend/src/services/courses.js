// import the courses service from feathers
import { courses } from "@/services/feathers";

/**
 * addCourse(course)
 * 
 * This function will attempt to add a new course to the 
 * database. In the event that there is a problem, e.g.
 * a course with the same `code` already exists, an error
 * will be returned. Otherwise, the newly added course 
 * object will be returned.
 * 
 * @param  {object} course The course to be created
 * @return {object}        The course that was created
 */
export const addCourse = async course => await courses.create(course);

/**
 * getCourses(query)
 * 
 * This function will query the database and retrieve
 * a list of courses. For details on the syntax of
 * the `query` parameter, see the feathersjs documentation
 * for the `find()` function:
 * https://docs.feathersjs.com/api/databases/querying.html
 * 
 * @param  {object} query Any additional standard feathers params
 * @return {object}       A paginated feathers query result
 */
export const getCourses = async query => {
  // make sure the query parameter has a default value
  query = query || {};
  // execute and return the query results
  return await courses.find(query);
};

/**
 * getCourse(id, params)
 * 
 * This function gets a fully "hydrated" course object, i.e.
 * in addition to the basic course info (title, difficulty),
 * it will also get all the students enrolled and the subjects
 * with which the course is associated. In other words it 
 * returns a course along with all of its associated data.
 * 
 * @param  {number} id     The ID of the course to be retrieved
 * @param  {object} params Any additional feathers query params
 * @return {object}        The hydrated course object retrieved
 */
export const getCourse = async (id, params) => {
  // make sure a course ID was specified
  if ("undefined" === typeof id) {
    throw new Error("Please provide a valid course ID.");
  }
  params = params || {};
  return await courses.get(id, params);
};

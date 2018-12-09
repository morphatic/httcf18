// import the subjects service from feathers
import { subjects } from "@/services/feathers";

/**
 * addSubject(subject)
 * 
 * This function will attempt to add a new subject to the 
 * database. In the event that there is a problem, e.g.
 * a subject with the same `code` already exists, an error
 * will be returned. Otherwise, the newly added subject 
 * object will be returned.
 * 
 * @param  {object} subject The subject to be created
 * @return {object}         The subject that was created
 */
export const addSubject = async subject => await subjects.create(subject);

/**
 * getSubjects(query)
 * 
 * This function will query the database and retrieve
 * a list of subjects. For details on the syntax of
 * the `query` parameter, see the feathersjs documentation
 * for the `find()` function:
 * https://docs.feathersjs.com/api/databases/querying.html
 * 
 * @param  {object} query Any additional standard feathers params
 * @return {object}       A paginated feathers query result
 */
export const getSubjects = async query => {
  // make sure the query parameter has a default value
  query = query || {};
  // execute and return the query results
  return await subjects.find(query);
};

/**
 * getSubject(id, params)
 * 
 * This function gets a fully "hydrated" subject object, i.e.
 * in addition to the basic subject info (code, description),
 * it will also get all the courses associated with the subject.
 * In other words it returns a subject along with all of its 
 * associated data.
 * 
 * @param  {number} id     The ID of the subject to be retrieved
 * @param  {object} params Any additional feathers query params
 * @return {object}        The hydrated subject object retrieved
 */
export const getSubject = async (id, params) => {
  // make sure a subject ID was specified
  if ("undefined" === typeof id) {
    throw new Error("Please provide a valid subject ID.");
  }
  params = params || {};
  return await subjects.get(id, params);
};


/**
 * updateSubject(id, subject, params)
 * 
 * This function updates the data associated with a subject.
 * 
 * @param  {number} id      The ID of the subject to be retrieved
 * @param  {object} subject The subject data to be updated
 * @param  {object} params  Any additional feathers query params
 * @return {object}         The updated subject object
 */
export const updateSubject = async (id, subject, params) => {
  // make sure a subject ID was specified
  if ("undefined" === typeof id) {
    throw new Error("Please provide a valid subject ID.");
  }
  params = params || {};
  return await subjects.patch(id, subject, params);
}
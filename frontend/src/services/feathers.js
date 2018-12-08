// import the feathersjs client library
import feathers from "@feathersjs/client";
// import the axios HTTP request library
import axios from "axios";

// configure the feathers client
const db = feathers();
const rc = feathers.rest("http://localhost:3030");
db.configure(rc.axios(axios));

// export services
export const courses  = db.service("courses");
export const students = db.service("students");
export const subjects = db.service("subjects");

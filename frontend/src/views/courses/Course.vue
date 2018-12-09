<template>
  <div class="container page">
    <h1>{{ course.code }}: {{ course.title }}</h1>
    <v-alert
      v-if="apiError"
      v-model="apiError"
      dismissable
      type="warning"
      transition="fade-transition"
    >
      {{ apiError.code }} {{ apiError.name }}: {{ apiError.message }}
    </v-alert>
    <form>
      <v-text-field
        v-model="course.code"
        v-validate="{
          required: true,
          regex:/[A-Z]{2,5}\s\d{3}[A-Z]?/,
          unique: {
            course_id: course.id
          }
        }"
        :counter="10"
        :error-messages="errors.collect('code')"
        label="Course Code (e.g. ISAT 340)"
        data-vv-name="code"
        data-vv-validate-on="change"
        required
      ></v-text-field>
      <v-text-field
        v-model="course.title"
        v-validate="'required|max:35'"
        :counter="35"
        :error-messages="errors.collect('title')"
        label="Course Title (e.g. Software Development)"
        data-vv-name="title"
        required
      ></v-text-field>
      <v-select
        v-validate="'required'"
        :items="difficulties"
        v-model="course.difficulty"
        :error-messages="errors.collect('difficulty')"
        label="Course Difficulty"
        data-vv-name="difficulty"
        required
      ></v-select>
      <v-btn :disabled="!edited" @click="submit" class="secondary">Submit</v-btn>
    </form>
  </div>
</template>

<script>
// import the necessary database service functions
import { getCourse, getCourses, updateCourse } from "@/services/courses";
// configure the Course component (i.e. this page)
export default {
  name: "Course",
  // variables defined for use in our template
  data: () => ({
    // the 'course' is a default blank course object that
    // receive the values in the form so we can create a 
    // new course in the database
    course: {
      code: "",
      title: "",
      difficulty: null
    },
    // this variable will be populated if there is an error
    // when we try to submit something to the database, but
    // it defaults to `null`
    apiError: null,
    // these are the values that show up in the dropdown
    // menu for Course Difficulty
    difficulties: ["Beginner", "Intermediate", "Advanced"],
    // the 'dictionary' provides additional configuration info
    // to Vee Validate, including customized error messages
    dictionary: {
      // the 'attributes' tells Vee Validate to use the prettier
      // string to refer to the form field in error messages
      attributes: {
        code: "Course Code",
        title: "Course Title",
        difficulty: "Course Difficulty"
      },
      // the 'custom' property is where we define custom error
      // messages; most of the time this is not strictly
      // necessary as Vee Validate comes with useful default
      // error messages out of the box.
      custom: {
        code: {
          regex: () => {
            return (
              `The Course Code must be ALL-CAPS, start with a
               2-5 character department identifier (e.g. ISAT),
               followed by a space, followed by a 3-digit number,
               followed optionally by a single letter (e.g. "H"
               for honors courses).`
            );
          }
        },
        title: {
          max: "The Course Title can be at most 35 characters long."
        }
      }
    }
  }),
  computed: {
    edited() {
      return Object.keys(this.fields).some(key => this.fields[key].dirty);
    }
  },
  methods: {
    async submit() {
      // validate the form
      const valid = await this.$validator.validateAll();
      // if everthing is okay...
      if (valid) {
        try { // try to update the course in the database
          const course = await updateCourse(this.course);
          // then redirect back to the Courses page with
          // a success message
          this.$router.replace({
            name: "courses",
            query: {
              status: "success",
              message: `Success! The course "${course.code}: ` +
                `${course.title}" has been updated!`
            }
          });
        } catch(err) {
          // uh-oh! there was a problem creating the course
          this.apiError = err;
        }
      }
    }
  },
  async mounted() {
    // load the course
    try {
      this.course = await getCourse(this.$route.params.id);
    } catch(err) {
      this.apiError = err;
    }
    // tell Vee Validate to use our custom dictionary
    this.$validator.localize("en", this.dictionary);
    // below is a custom validator that will check the database
    // to make sure that the Course Code is unique BEFORE we are
    // allowed to submit this form; using custom validators like
    // this is an advanced technique but can greatly improve the
    // user experience as well as the data integrity of your app.
    this.$validator.extend("unique", {
      getMessage: field => 
        `This ${field} already exists in the database. It must be unique.`,
      validate(value, {course_id}) {
        // query the database for a course with the code entered in the form.
        // if the number of returned results is NOT zero, then a course with
        // this code already exists in the database and we should return false.
        return getCourses({
          query: {
            code: value,
            id: { $ne: course_id } // exclude the current course from the query
          }
        })
        .then(res => res.data.length === 0);
      }
    }, {
      immediate: false,
      paramNames: ["course_id"]
    });
  },
  // initialize Vee Validate
  $_veeValidate: {
    validator: "new"
  }
};
</script>

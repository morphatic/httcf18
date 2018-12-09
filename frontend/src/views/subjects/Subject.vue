<template>
  <div class="container page">
    <h1>{{ subject.code }}</h1>
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
        v-model="subject.code"
        v-validate="{
          required: true,
          unique: {
            subject_id: subject.id
          }
        }"
        :counter="20"
        :error-messages="errors.collect('code')"
        label="Subject Code (e.g. Programming)*"
        data-vv-name="code"
        required
      ></v-text-field>
      <v-textarea
        v-model="subject.description"
        v-validate="'required|max:350'"
        :counter="350"
        :error-messages="errors.collect('description')"
        label="Subject Description*"
        data-vv-name="description"
        required
      ></v-textarea>
      <v-btn :disabled="!edited" @click="submit" class="secondary">Submit</v-btn>
    </form>
  </div>
</template>

<script>
// import the necessary database service functions
import { getSubject, getSubjects, updateSubject } from "@/services/subjects";
// configure the Subject component (i.e. this page)
export default {
  name: "Subject",
  // variables defined for use in our template
  data: () => ({
    // the 'subject' is a default blank subject object that
    // receive the values in the form so we can create a 
    // new subject in the database
    subject: {
      code: "",
      description: ""
    },
    // this variable will be populated if there is an error
    // when we try to submit something to the database, but
    // it defaults to `null`
    apiError: null,
    // the 'dictionary' provides additional configuration info
    // to Vee Validate, including customized error messages
    dictionary: {
      // the 'attributes' tells Vee Validate to use the prettier
      // string to refer to the form field in error messages
      attributes: {
        code: "Subject Code",
        title: "Subject Title",
        difficulty: "Subject Difficulty"
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
        try { // try to update the subject in the database
          const subject = await updateSubject(this.subject.id, this.subject);
          // then redirect back to the Subjects page with
          // a success message
          this.$router.replace({
            name: "subjects",
            query: {
              status: "success",
              message: `Success! The subject "${subject.code}" ` +
                `has been updated!`
            }
          });
        } catch(err) {
          // uh-oh! there was a problem creating the subject
          this.apiError = err;
        }
      }
    }
  },
  async mounted() {
    // load the subject
    try {
      this.subject = await getSubject(this.$route.params.id);
    } catch(err) {
      this.apiError = err;
    }
    // tell Vee Validate to use our custom dictionary
    this.$validator.localize("en", this.dictionary);
    // below is a custom validator that will check the database
    // to make sure that the Subject Code is unique BEFORE we are
    // allowed to submit this form; using custom validators like
    // this is an advanced technique but can greatly improve the
    // user experience as well as the data integrity of your app.
    this.$validator.extend("unique", {
      getMessage: field => 
        `This ${field} already exists in the database. It must be unique.`,
      validate(value, {subject_id}) {
        // query the database for a subject with the code entered in the form.
        // if the number of returned results is NOT zero, then a subject with
        // this code already exists in the database and we should return false.
        return getSubjects({
          query: {
            code: value,
            id: { $ne: subject_id } // exclude the current subject from the query
          }
        })
        .then(res => res.data.length === 0);
      }
    }, {
      immediate: false,
      paramNames: ["subject_id"]
    });
  },
  // initialize Vee Validate
  $_veeValidate: {
    validator: "new"
  }
};
</script>

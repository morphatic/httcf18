<template>
  <div class="container page">
    <h1>Add a New Subject</h1>
    <v-alert
      v-if="creationError"
      v-model="creationError"
      dismissable
      type="warning"
      transition="fade-transition"
    >
      {{ creationError.code }} {{ creationError.name }}: {{ creationError.message }}
    </v-alert>
    <form>
      <v-text-field
        v-model="subject.code"
        v-validate="{
          required: true,
          unique: true
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
      <v-btn @click="submit" class="secondary">Submit</v-btn>
    </form>
  </div>
</template>

<script>
// import the necessary database service functions
import { addSubject, getSubjects } from "@/services/subjects";
// configure the New Subject component (i.e. this page)
export default {
  name: "NewSubject",
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
    // when we try to submit the subject to the database, but
    // it defaults to `null`
    creationError: null,
    // the 'dictionary' provides additional configuration info
    // to Vee Validate, including customized error messages
    dictionary: {
      // the 'attributes' tells Vee Validate to use the prettier
      // string to refer to the form field in error messages
      attributes: {
        code: "Subject Code",
        description: "Subject Description"
      }
    }
  }),
  methods: {
    async submit() {
      // validate the form
      const valid = await this.$validator.validateAll();
      // if everthing is okay...
      if (valid) {
        try { // try to create the subject in the database
          const subject = await addSubject(this.subject);
          // then redirect back to the Subjects page with
          // a success message
          this.$router.replace({
            name: "subjects",
            query: {
              status: "success",
              message: `Success! The subject "${subject.code}" ` +
                `has been added to the database!`
            }
          });
        } catch(err) {
          // uh-oh! there was a problem creating the subject
          this.creationError = err;
        }
      }
    }
  },
  mounted() {
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
      validate: value => {
        // query the database for a subject with the code entered in the form.
        // if the number of returned results is NOT zero, then a subject with
        // this code already exists in the database and we should return false.
        return getSubjects({ query: { code: value } })
          .then(res => res.data.length === 0);
      }
    }, { immediate: false });
  },
  // initialize Vee Validate
  $_veeValidate: {
    validator: "new"
  }
};
</script>

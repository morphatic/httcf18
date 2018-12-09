<template>
  <div class="container page">
    <h1>{{ name }}</h1>
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
        v-model="student.first_name"
        v-validate="'required'"
        :error-messages="errors.collect('first_name')"
        label="First Name*"
        data-vv-name="first_name"
        required
      ></v-text-field>
      <v-text-field
        v-model="student.middle_initial"
        v-validate="{ max: 1, regex: /[A-Z]/ }"
        :error-messages="errors.collect('middle_initial')"
        label="Middle Initial"
        data-vv-name="middle_initial"
      ></v-text-field>
      <v-text-field
        v-model="student.last_name"
        v-validate="'required'"
        :error-messages="errors.collect('last_name')"
        label="Last Name*"
        data-vv-name="last_name"
        required
      ></v-text-field>
      <v-text-field
        v-model="student.ssn"
        :append-icon="show_ssn ? 'visibility_off' : 'visibility'"
        v-validate="{ required: true, regex: /\d{9}/ }"
        :type="show_ssn ? 'text' : 'password'"
        label="Social Security Number*"
        data-vv-name="ssn"
        hint="Numbers only (no dashes)"
        :counter="9"
        @click:append="show_ssn = !show_ssn"
        required
      ></v-text-field>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="student.dob"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="student.dob"
          label="Birth Date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="student.dob" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(student.dob)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
      <v-text-field
        v-model="student.address"
        v-validate="'required'"
        :error-messages="errors.collect('address')"
        label="Address (e.g. Street, City, State)*"
        data-vv-name="address"
        required
      ></v-text-field>
      <v-text-field
        v-model="student.zip"
        v-validate="{ required: true, regex: /\d{5}/ }"
        :counter="5"
        :error-messages="errors.collect('zip')"
        label="Zip Code (5-digit)*"
        data-vv-name="zip"
        required
      ></v-text-field>
      <v-text-field
        v-model="student.phone"
        v-validate="{ required: true, regex:/\d{10}/ }"
        :counter="10"
        mask="phone"
        :error-messages="errors.collect('phone')"
        label="Phone Number (10-digit)*"
        data-vv-name="phone"
        required
      ></v-text-field>
      <v-text-field
        v-model="student.gender"
        label="Gender"
      ></v-text-field>
      <v-btn :disabled="!edited" @click="submit" class="secondary">Submit</v-btn>
    </form>
  </div>
</template>

<script>
// import the necessary database service functions
import { getStudent, updateStudent } from "@/services/students";
// configure the Student component (i.e. this page)
export default {
  name: "Student",
  // variables defined for use in our template
  data: () => ({
    // the 'student' is a default blank student object that
    // receive the values in the form so we can create a 
    // new student in the database
    student: {
      first_name: "",
      middle_initial: "",
      last_name: "",
      ssn: "",
      dob: "",
      address: "",
      zip: "",
      phone: "",
      gender: ""
    },
    // controls default visibility for the SSN field and date picker
    show_ssn: false,
    modal: false,
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
        first_name: "First Name",
        middle_initial: "Middle Initial",
        last_name: "Last Name",
        ssn: "Social Security Number",
        dob: "Birth Date",
        address: "Address",
        zip: "Zip Code",
        phone: "Phone Number",
        gender: "Gender"
      },
      // the 'custom' property is where we define custom error
      // messages; most of the time this is not strictly
      // necessary as Vee Validate comes with useful default
      // error messages out of the box.
      custom: {
        ssn: {
          regex: () => {
            return (
              `The Social Security Number must be exactly 9 digits without dashes.`
            );
          }
        },
        zip: {
          regex: () => {
            return (
              `The Zip Code must be exactly 5 digits.`
            );
          }
        },
        phone: {
          regex: () => {
            return (
              `The Phone Number must be exactly 10 digits without other characters.`
            );
          }
        },
      }
    }
  }),
  computed: {
    edited() {
      return Object.keys(this.fields).some(key => this.fields[key].dirty);
    },
    name() {
      const mi = this.student.middle_initial !== "" ?
        `${this.student.middle_initial}. ` : "";
      return `${this.student.first_name} ${mi}${this.student.last_name}`;
    }
  },
  methods: {
    async submit() {
      // validate the form
      const valid = await this.$validator.validateAll();
      // if everthing is okay...
      if (valid) {
        try { // try to update the student in the database
          const student = await updateStudent(this.student.id, this.student);
          // then redirect back to the Students page with
          // a success message
          this.$router.replace({
            name: "students",
            query: {
              status: "success",
              message: `Success! The student ${student.first_name} ` +
                `${student.last_name} has been updated!`
            }
          });
        } catch(err) {
          // uh-oh! there was a problem updating the student
          this.apiError = err;
        }
      }
    }
  },
  async mounted() {
    // load the student
    try {
      this.student = await getStudent(this.$route.params.id);
    } catch(err) {
      this.apiError = err;
    }
    // tell Vee Validate to use our custom dictionary
    this.$validator.localize("en", this.dictionary);
  },
  // initialize Vee Validate
  $_veeValidate: {
    validator: "new"
  }
};
</script>

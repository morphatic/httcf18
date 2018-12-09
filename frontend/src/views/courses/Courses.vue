<template>
  <div class="container page">
    <h1>Courses</h1>
    <v-alert
      v-if="alert"
      v-model="alert"
      dismissible
      :type="alert.status"
      transition="fade-transition"
    >
      {{ alert.message }}
    </v-alert>
    <p>
      <v-btn large color="secondary" :to="'/courses/new'">
        <v-icon left dark>add</v-icon>
        Add New Course
      </v-btn>
    </p>
    <v-card>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="courses.data"
        item-key="id"
        :total-items="courses.total"
        select-all
        :pagination.sync="pagination"
        :rows-per-page-items="rowsPerPageItems"
        must-sort
      >
        <template slot="items" slot-scope="props">
          <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>
              <v-checkbox
                v-model="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td>
              <router-link :to="`/courses/${props.item.id}`">
                {{ props.item.code }}
              </router-link>
            </td>
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.difficulty }}</td>
          </tr>
        </template>
      </v-data-table>
      <v-container fluid>
        <v-layout row justify-space-around align-top>
          <v-flex xs5>
            <v-select
              v-model="subject"
              class="item"
              label="Pick a Subject"
              item-text="code"
              item-value="id"
              item-key="id"
              :items="subjects"
              solo
              clearable
            ></v-select>
          </v-flex>
          <v-flex xs5>
            <v-btn
              class="secondary item"
              large block
              :disabled="allowSubjectAssociation"
              @click="associateCoursesWithSubject"
            >Add Selected Courses to Subject</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container fluid>
        <v-layout row justify-space-around align-top>
          <v-flex xs5>
            <v-select
              v-model="student"
              class="item"
              label="Pick a Student"
              item-text="name"
              item-value="id"
              item-key="id"
              :items="students"
              solo
              clearable
            ></v-select>
          </v-flex>
          <v-flex xs5>
            <v-btn
              class="secondary item"
              large block
              :disabled="allowStudentAssociation"
              @click="associateCoursesWithStudent"
            >Add Selected Courses to Student</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { getCourses } from "@/services/courses";
import { getSubjects, updateSubject } from "@/services/subjects";
import { getStudents, updateStudent } from "@/services/students";
export default {
  name: "Courses",
  data: () => ({
    courses: {
      total: 0,
      data: []
    },
    selected: [],
    subject: null,
    student: null,
    rowsPerPageItems: [10, 25, 50],
    pagination: {
      descending: false,
      page: 1,
      rowsPerPage: 10,
      sortBy: "code",
      totalItems: 0
    },
    headers: [
      {
        text: "Code",
        value: "code"
      },
      {
        text: "Title",
        value: "title"
      },
      {
        text: "Difficulty",
        value: "difficulty"
      }
    ],
    alert: null
  }),
  asyncComputed: {
    courses: {
      async get() {
        let query = {
          $limit: this.pagination.rowsPerPage,
          $skip: (this.pagination.page - 1) * this.pagination.rowsPerPage,
          $sort: {
            [this.pagination.sortBy]:  this.pagination.descending ? -1 : 1
          }
        };
        return await getCourses({ query });
      },
      default: {
        total: 0,
        data: []
      }
    },
    subjects: {
      async get() {
        let subs = await getSubjects({query:{$limit: 50, $sort:{code: 1}}});
        return subs.data;
      },
      default: []
    },
    students: {
      async get() {
        let studs = await getStudents({query:{$limit: 50, $sort:{last_name: 1}}});
        studs = studs.data.map(s => Object.assign(s, {name: `${s.first_name} ${s.last_name}`}));
        return studs;
      },
      default: []
    }
  },
  computed: {
    allowSubjectAssociation() {
      return !this.subject || this.selected.length == 0;
    },
    allowStudentAssociation() {
      return !this.student || this.selected.length == 0;
    }
  },
  methods: {
    async associateCoursesWithSubject() {
      let sub = this.subjects.filter(s => s.id === this.subject)[0];
      sub.courses = this.selected.map(c => c.id);
      let res;
      try {
        res = await updateSubject(sub.id, sub);
        res = {
          status: 'success',
          message: `Success! Selected course(s) added to ${res.code}!`
        };
      } catch(err) {
        res = err;
      }
      this.alert = res;
    },
    async associateCoursesWithStudent() {
      let stud = this.students.filter(s => s.id === this.student)[0];
      stud.courses = this.selected.map(c => c.id);
      // remove the temporary "name" field
      delete stud.name;
      let res;
      try {
        res = await updateStudent(stud.id, stud);
        res = {
          status: 'success',
          message: `Success! Selected course(s) added to ${res.first_name}'s profile!`
        };
      } catch(err) {
        res = err;
      }
      this.alert = res;      
    }
  },
  async mounted() {
    const query = await this.$route.query;
    this.alert = query.status ? query : null;
  }
}
</script>

<template>
  <div class="container page">
    <h1>Students</h1>
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
      <v-btn large color="secondary" :to="'/students/new'">
        <v-icon left dark>person_add</v-icon>
        Add New Student
      </v-btn>
    </p>
    <v-card>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="students.data"
        select-all
        item-key="id"
        :total-items="students.total"
        :pagination.sync="pagination"
        :rows-per-page-items="rowsPerPageItems"
        must-sort>
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
              <router-link :to="`/students/${props.item.id}`">
                {{ props.item.first_name }} {{ props.item.last_name }}
              </router-link>
            </td>
            <td>{{ props.item.dob.substr(0, 10) }}</td>
            <td>{{ props.item.gender }}</td>
          </tr>
        </template>
      </v-data-table>
      <v-container fluid>
        <v-layout row justify-space-around align-top>
          <v-flex xs5>
            <v-select
              v-model="course"
              class="item"
              label="Pick a Course"
              item-text="code"
              item-value="id"
              item-key="id"
              :items="courses"
              solo
              clearable
            ></v-select>
          </v-flex>
          <v-flex xs5>
            <v-btn
              class="secondary item"
              large block
              :disabled="allowCourseAssociation"
              @click="associateStudentsWithCourse"
            >Add Selected Students to Course</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { getStudents } from "@/services/students";
import { getCourses, updateCourse } from "@/services/courses";
export default {
  name: "Students",
  data: () => ({
    students: {
      total: 0,
      data: []
    },
    selected: [],
    course: null,
    rowsPerPageItems: [10, 25, 50],
    pagination: {
      descending: false,
      page: 1,
      rowsPerPage: 10,
      sortBy: "last_name",
      totalItems: 0
    },
    headers: [
      {
        text: "Name",
        value: "last_name"
      },
      {
        text: "Birthday",
        value: "dob"
      },
      {
        text: "Gender",
        value: "gender"
      }
    ],
    alert: null
  }),
  asyncComputed: {
    students: {
      async get() {
        let query = {
          $limit: this.pagination.rowsPerPage,
          $skip: (this.pagination.page - 1) * this.pagination.rowsPerPage,
          $sort: {
            [this.pagination.sortBy]:  this.pagination.descending ? -1 : 1
          }
        };
        return await getStudents({ query });
      },
      default: {
        total: 0,
        data: []
      }
    },
    courses: {
      async get() {
        let c = await getCourses({query:{$limit: 50, $sort:{code: 1}}});
        return c.data;
      },
      default: []
    }
  },
  computed: {
    allowCourseAssociation() {
      return !this.course || this.selected.length == 0;
    }
  },
  methods: {
    async associateStudentsWithCourse() {
      let crs = this.courses.filter(s => s.id === this.course)[0];
      crs.students = this.selected.map(c => c.id);
      let res;
      try {
        res = await updateCourse(crs.id, crs);
        res = {
          status: 'success',
          message: `Success! Selected students(s) added to ${res.code}!`
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

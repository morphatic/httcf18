<template>
  <div class="container page">
    <!-- <v-breadcrumbs :items="breadcrumbs">
      <v-icon slot="divider">chevron_right</v-icon>
    </v-breadcrumbs> -->
    <h1>Subjects</h1>
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
      <v-btn large color="secondary" :to="'/subjects/new'">
        <v-icon left dark>add</v-icon>
        Add New Subject
      </v-btn>
    </p>
    <v-card>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="subjects.data"
        item-key="id"
        select-all
        :total-items="subjects.total"
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
              <router-link :to="`/subjects/${props.item.id}`">
                {{ props.item.code }}
              </router-link>
            </td>
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
              @click="associateSubjectsWithCourse"
            >Add Selected Subjects to Course</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { getSubjects } from "@/services/subjects";
import { getCourses, updateCourse } from "@/services/courses";
export default {
  name: "Subjects",
  data: () => ({
    subjects: {
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
      sortBy: "code",
      totalItems: 0
    },
    headers: [
      {
        text: "Code",
        value: "code"
      }
    ],
    alert: null
  }),
  // computed: {
  //   breadcrumbs() {
  //     let breadcrumbs = this.$route.meta.breadcrumbs;
  //     breadcrumbs.push({
  //       text: this.$route.name,
  //       href: this.$route.path
  //     });
  //     console.log(breadcrumbs);
  //     return breadcrumbs;
  //   }
  // },
  asyncComputed: {
    subjects: {
      async get() {
        let query = {
          $limit: this.pagination.rowsPerPage,
          $skip: (this.pagination.page - 1) * this.pagination.rowsPerPage,
          $sort: {
            [this.pagination.sortBy]:  this.pagination.descending ? -1 : 1
          }
        };
        return await getSubjects({ query });
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
    async associateSubjectsWithCourse() {
      let crs = this.courses.filter(s => s.id === this.course)[0];
      crs.subjects = this.selected.map(c => c.id);
      let res;
      try {
        res = await updateCourse(crs.id, crs);
        res = {
          status: 'success',
          message: `Success! Selected subjects(s) added to ${res.code}!`
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

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
        :headers="headers"
        :items="courses.data"
        item-key="id"
        :total-items="courses.total"
        :pagination.sync="pagination"
        :rows-per-page-items="rowsPerPageItems"
        must-sort>
        <template slot="items" slot-scope="{item}">
          <td class="text-xs-center">
            <router-link :to="`/courses/${item.id}`">
              {{ item.code }}
            </router-link>
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.difficulty }}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { getCourses } from "@/services/courses";
export default {
  name: "Courses",
  data: () => ({
    courses: {
      total: 0,
      data: []
    },
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
        value: "code",
        align: "center"
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
    }
  },
  async mounted() {
    const query = await this.$route.query;
    this.alert = query.status ? query : null;
  }
}
</script>

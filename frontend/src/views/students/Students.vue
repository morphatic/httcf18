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
        :headers="headers"
        :items="students.data"
        item-key="id"
        :total-items="students.total"
        :pagination.sync="pagination"
        :rows-per-page-items="rowsPerPageItems"
        must-sort>
        <template slot="items" slot-scope="{item}">
          <td class="text-xs-center">
            <router-link :to="`/students/${item.id}`">
              {{ item.first_name }} {{ item.last_name }}
            </router-link>
          </td>
          <td>{{ item.dob.substr(0, 10) }}</td>
          <td>{{ item.gender }}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { getStudents } from "@/services/students";
export default {
  name: "Students",
  data: () => ({
    students: {
      total: 0,
      data: []
    },
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
        value: "last_name",
        align: "center"
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
    }
  },
  async mounted() {
    const query = await this.$route.query;
    this.alert = query.status ? query : null;
  }
}
</script>

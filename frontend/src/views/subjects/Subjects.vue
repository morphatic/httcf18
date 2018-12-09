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
        :headers="headers"
        :items="subjects.data"
        item-key="id"
        :total-items="subjects.total"
        :pagination.sync="pagination"
        :rows-per-page-items="rowsPerPageItems"
        must-sort>
        <template slot="items" slot-scope="{item}">
          <td>
            <router-link :to="`/subjects/${item.id}`">
              {{ item.code }}
            </router-link>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { getSubjects } from "@/services/subjects";
export default {
  name: "Subjects",
  data: () => ({
    subjects: {
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
    }
  },
  async mounted() {
    const query = await this.$route.query;
    this.alert = query.status ? query : null;
  }
}
</script>

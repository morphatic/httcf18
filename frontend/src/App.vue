<template>
  <v-app>
    <v-navigation-drawer
      app
      clipped
      persistent
      :mini-variant="miniVariant"
      v-model="drawer"
    >
      <v-list>
        <v-list-tile 
          v-for="(route, i) in routes.filter(r => r.meta && r.meta.icon)" 
          :key="i" 
          :to="route.path"
        >
          <v-list-tile-action>
            <v-icon v-html="route.meta.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ route.name | capitalize }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-btn icon @click.stop="miniVariant = !miniVariant">
            <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app clipped-left class="primary white--text">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase" v-text="title"></v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
    <v-footer app fixed inset>
      <span>&copy; 2018 Morgan C. Benton, All rights reserved.</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      routes: this.$router.options.routes,
      miniVariant: false,
      title: "HTTC"
    }
  }
}
</script>

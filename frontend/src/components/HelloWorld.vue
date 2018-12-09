<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to the Harrisonburg Technical Training Center Website
        </h1>
        <p class="subheading font-weight-regular">
          This project demonstrates modern app development with a
          database backend for the ISAT 340 class.
        </p>
      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>

        <v-layout justify-center>
          Check out the <a href="/about">About</a> page for further
          documentation on this project.
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "hello-world"
}
</script>

<style>

</style>

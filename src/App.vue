<template>
  <v-app id="app">
    <v-container style="height:100%" class="d-flex align-center">
      <v-layout row>
        <v-col cols="6" offset="3">
          <Todo />
        </v-col>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Todo from "./components/Todo/Todo.vue";

export default Vue.extend({
  components: {
    Todo
  }
});
</script>

<style lang="scss">
#app {
  font-family: "Montserrat", sans-serif !important;
  height: 100vh;
  background: url("./assets/cover.jpg");
  background-size: cover;
  overflow: hidden;
}
</style>
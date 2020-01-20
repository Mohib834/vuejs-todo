<template>
  <div style="width:100%">
    <v-divider />
    <v-flex class="footer-content mt-4 d-flex justify-space-between">
      <span>{{leftTodos}} Items left</span>
      <a
        href
        @click.prevent="clearCompletedTodos"
        :class="{'cleared': isCompletedTodosEmpty}"
      >Clear completed</a>
    </v-flex>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import store from "@/store/store";

export default Vue.extend({
  computed: {
    ...mapGetters(["isCompletedTodosEmpty", "leftTodos"])
  },
  methods: {
    clearCompletedTodos(): void {
      store.dispatch.clearCompletedTodo();
    }
  }
});
</script>

<style lang="scss">
.footer-content {
  span {
    color: rgba(0, 0, 0, 0.7);
  }
  a {
    color: #00d0e1;
    border-bottom: 1px solid #00d0e1;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;

    &:hover {
      transform: translateY(-1px);
    }

    &:focus,
    &:active {
      transform: translate(0px);
    }
  }

  .cleared {
    color: rgba(0, 0, 0, 0.4);
    border-color: rgba(0, 0, 0, 0.3);
    cursor: default;

    &:hover {
      transform: translateY(0);
    }
  }
}
</style>
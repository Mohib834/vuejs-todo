<template>
  <div class="mb-2" ref="todo">
    <v-flex class="d-flex align-center" style="height:40px">
      <v-checkbox
        v-model="completedTodos"
        :value="todo"
        dense
        class="mb-n1"
        @change="checkLeftTodos({todoIdx})"
      ></v-checkbox>
      <p
        class="todo-text mb-0 ml-1 subtitle-1 font-weight-medium"
        :class="{'crossed': todo.done}"
      >{{todo.todoText}}</p>
      <v-spacer />
      <v-icon
        v-if="!completedTodosContainer"
        @click="deleteTodo({todoIdx})"
        color="#CA0B00"
        v-ripple
        style="cursor:pointer"
      >mdi-close</v-icon>
    </v-flex>
    <v-divider />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { gsap } from "gsap";
import store from "@/store/store";

export default Vue.extend({
  props: {
    todo: {
      type: Object,
      required: true
    },
    todoIdx: {
      type: Number,
      required: true
    },
    completedTodosContainer: {
      type: Boolean
    }
  },
  computed: {
    completedTodos: {
      get(): Array<{ todoText: string; done: true }> {
        return store.getters.completedTodos;
      },
      set(value: Array<{ todoText: string; done: true }>): void {
        store.state.todoModule.completedTodos = value;
      }
    }
  },
  methods: {
    deleteTodo(payload: { todoIdx: number }): void {
      store.dispatch.deleteTodo(payload);
    },
    checkLeftTodos(payload: { todoIdx: number }): void {
      store.dispatch.checkLeftTodos(payload);
    }
  },
  mounted() {
    const tl = gsap.timeline();

    tl.from(this.$refs.todo, 0.5, {
      y: "-10px",
      opacity: 0
    });
  }
});
</script>

<style lang="scss" scoped>
.todo-text {
  position: relative;
  transition: color 0s 0.4s;
  color: rgba(0, 0, 0, 0.7);
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 50%;
    border-bottom: 1px solid #00d0e1;
    width: 0%;
    transition: all 0.3s;
    margin-left: -10px;
  }
}
.crossed {
  color: rgba(0, 0, 0, 0.5);
  &::after {
    width: 120%;
  }
}
</style>

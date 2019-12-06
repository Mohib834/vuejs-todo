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

<script>
import { TimelineMax, Power3 } from "gsap";
import { mapActions } from "vuex";

export default {
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
      get() {
        return this.$store.state.completedTodos;
      },
      set(value) {
        this.$store.state.completedTodos = value;
      }
    }
  },
  methods: {
    ...mapActions(["deleteTodo", "completeTodo", "checkLeftTodos"])
  },
  mounted() {
    const tl = new TimelineMax();

    tl.from(this.$refs.todo, 0.5, {
      y: "-10px",
      opacity: 0,
      ease: Power3.easeOut
    });
  }
};
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

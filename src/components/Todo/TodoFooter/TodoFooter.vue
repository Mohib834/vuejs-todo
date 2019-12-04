<template>
  <div style="width:100%">
    <v-divider />
    <v-flex class="footer-content mt-4 d-flex justify-space-between">
      <span>{{ leftTodos }} Items left</span>
      <a
        href
        @click.prevent="clearCompleted"
        :class="{'cleared': isCompletedTodoListEmpty}"
      >Clear completed</a>
    </v-flex>
  </div>
</template>

<script>
export default {
  props: {
    completedTodos: {
      type: Array,
      required: true
    },
    todos: {
      type: Array,
      required: true
    },
    leftTodos: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isCompletedTodoListEmpty: true
    };
  },
  watch: {
    completedTodos(todosData) {
      todosData.length > 0
        ? (this.isCompletedTodoListEmpty = false)
        : (this.isCompletedTodoListEmpty = true);
    }
  },
  methods: {
    clearCompleted() {
      this.isCompletedTodoListEmpty = true;
      this.$emit("clearedCompletedTodos");
    }
  }
};
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
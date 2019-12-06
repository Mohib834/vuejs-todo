<template>
  <v-card class="d-flex flex-column pa-6 mx-auto" height="500px" elevation="5" width="520px">
    <v-card-title class="d-flex justify-space-between align-center mb-3">
      <span class="primary--text font-weight-light" style="font-size:30px">Todo List</span>
      <v-tabs v-model="category" height="40px" class="d-flex justify-end" style="width:300px;">
        <v-tab>All</v-tab>
        <v-tab>Completed</v-tab>
      </v-tabs>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="addTodo">
        <v-flex class="d-flex align-center">
          <v-text-field label="What needs to be done?" v-model="todoText"></v-text-field>
          <v-btn
            @click.prevent="addTodo"
            class="mr-n3 ml-2 mt-n2"
            elevation="3"
            color="primary"
            rounded
            small
            fab
          >
            <v-icon size="20">mdi-plus</v-icon>
          </v-btn>
        </v-flex>
      </v-form>
    </v-card-text>
    <v-card-text>
      <div v-show="category === 0">
        <AddedTodo v-for="(todo, i) in todos" :key="i" :todo="todo" :todoIdx="i" />
      </div>
      <div v-show="category === 1">
        <AddedTodo
          v-for="(todo, i) in completedTodos"
          :key="i"
          :todo="todo"
          :todoIdx="i"
          :completedTodosContainer="true"
        />
      </div>
      <v-alert
        color="primary"
        dark
        dense
        width="80%"
        style="position:relative; top: 45px; letter-spacing:.5px !important"
        class="text-center mx-auto subtitle-1 font-weight-medium"
        v-if="todos.length === 0"
      >
        No Todo Created Yet
        <span
          class="d-inline-block ml-2"
          style="position:relative; top:-2px; transform:rotateZ(90deg)"
        >:(</span>
      </v-alert>
    </v-card-text>
    <v-card-actions class="mt-auto">
      <TodoFooter />
    </v-card-actions>
  </v-card>
</template>

<script>
import AddedTodo from "./AddedTodo/AddedTodo.vue";
import TodoFooter from "./TodoFooter/TodoFooter.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    AddedTodo,
    TodoFooter
  },
  data() {
    return {
      leftTodos: 0
    };
  },
  computed: {
    todoText: {
      get() {
        return this.$store.state.todoText;
      },
      set(value) {
        this.$store.state.todoText = value;
      }
    },
    category: {
      get() {
        return this.$store.state.category;
      },
      set(value) {
        this.$store.dispatch("updateCategory", value);
      }
    },
    ...mapGetters(["todos", "completedTodos", "isCompletedTodosEmpty"])
  },
  methods: {
    ...mapActions(["addTodo", "changeIsCompletedTodosEmpty", ])
  },
  watch: {
    completedTodos(value) {
      if (value.length > 0) {
        this.changeIsCompletedTodosEmpty(false);
      } else {
        this.changeIsCompletedTodosEmpty(true);
      }
    }
  }
};
</script>
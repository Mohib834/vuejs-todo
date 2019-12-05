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
      <v-form @submit.prevent="submitTodo">
        <v-flex class="d-flex align-center">
          <v-text-field label="What needs to be done?" v-model="todoText"></v-text-field>
          <v-btn
            @click.prevent="submitTodo"
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
      <div v-if="category === 0">
        <AddedTodo
          v-for="(todo, i) in todos"
          :key="i"
          :todo="todo"
          :todoIdx="i"
          @deletedTodo="handleDeletedTodo"
          @completedTodo="handleCompletedTodo"
        />
      </div>
      <div v-else>
        <AddedTodo
          v-for="(todo, i) in completedTodos"
          :key="i"
          :todo="todo"
          :todoIdx="i"
          @deletedTodo="handleDeletedTodo"
          @completedTodo="handleCompletedTodo"
          :completedTodos="true"
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
      <TodoFooter
        :completedTodos="completedTodos"
        :todos="todos"
        :leftTodos="leftTodos"
        @clearedCompletedTodos="handleClearedCompletedTodos"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import AddedTodo from "./AddedTodo/AddedTodo.vue";
import TodoFooter from "./TodoFooter/TodoFooter.vue";

export default {
  components: {
    AddedTodo,
    TodoFooter
  },
  data() {
    return {
      todoText: "",
      todos: [],
      completedTodos: [],
      leftTodos: 0,
      category: 0
    };
  },
  methods: {
    submitTodo() {
      this.todos.push({ todoText: this.todoText, done: false });
      this.todoText = "";
      this.leftTodos++;
    },
    handleDeletedTodo(todoIdx) {
      if (!this.todos[todoIdx].done) {
        this.leftTodos--;
      }
      this.todos = this.todos.filter(todo => todo !== this.todos[todoIdx]);
      this.completedTodos.splice(todoIdx, 1);
    },
    handleCompletedTodo(todoIdx) {
      const selectedTodo = this.todos[todoIdx];
      if (selectedTodo.done) {
        this.completedTodos.push(selectedTodo);
        this.leftTodos--;
      } else {
        if (this.completedTodos.includes(selectedTodo)) {
          this.completedTodos.splice(todoIdx, 1);
        }
        this.leftTodos++;
      }
    },
    handleClearedCompletedTodos() {
      for (let completedTodo of this.completedTodos) {
        if (this.todos.includes(completedTodo)) {
          this.todos = this.todos.filter(todo => completedTodo !== todo);
          this.completedTodos = this.todos.filter(
            todo => completedTodo !== todo
          );
        }
      }
    }
  }
};
</script>
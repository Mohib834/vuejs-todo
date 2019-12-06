import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        todoText: "",
        todos: [],
        completedTodos: [],
        isCompletedTodosEmpty: true,
        leftTodos: 0,
        category: 0,

    },
    getters: {
        todoText(state) {
            return state.todoText
        },
        todos(state) {
            return state.todos
        },
        completedTodos(state) {
            return state.completedTodos
        },
        leftTodos(state) {
            return state.leftTodos
        },
        category(state) {
            return state.category
        },
        isCompletedTodosEmpty(state) {
            return state.isCompletedTodosEmpty
        }
    },
    mutations: {
        updateTodoText(state, payload) {
            state.todoText = payload
        },
        updateCategory(state, payload) {
            state.category = payload;
        },
        addTodo(state) {
            state.todos.push({ todoText: state.todoText, done: false });
            state.todoText = '';
            state.leftTodos++;
        },
        deleteTodo(state, payload) {
            if (!state.todos[payload.todoIdx].done) {
                state.leftTodos--;
            }
            state.todos = state.todos.filter(todo => todo !== state.todos[payload.todoIdx]);
            state.completedTodos.splice(payload.todoIdx, 1);

        },
        changeIsCompletedTodosEmpty(state, payload) {
            state.isCompletedTodosEmpty = payload;
        },
        clearCompletedTodo(state) {
            if (!state.isCompletedTodosEmpty) {
                for (let completedTodo of state.completedTodos) {
                    state.todos = state.todos.filter(todo => todo !== completedTodo);
                }
                state.completedTodos = [];
            }
        },
        checkLeftTodos(state, payload) {
            if (state.todos[payload.todoIdx].done) {
                state.leftTodos++;
            } else {
                state.leftTodos--;
            }

            state.todos[payload.todoIdx].done = !state.todos[payload.todoIdx].done
        }
    },
    actions: {
        updateTodoText(context, payload) {
            context.commit('updateTodoText', payload);
        },
        updateCategory(context, payload) {
            context.commit('updateCategory', payload)
        },
        addTodo(context) {
            context.commit('addTodo');
        },
        deleteTodo(context, payload) {
            context.commit('deleteTodo', payload);
        },
        completeTodo(context, payload) {
            context.commit('completeTodo', payload);
        },
        changeIsCompletedTodosEmpty(context, payload) {
            context.commit('changeIsCompletedTodosEmpty', payload)
        },
        clearCompletedTodo(context) {
            context.commit('clearCompletedTodo');
        },
        checkLeftTodos(context, payload) {
            context.commit('checkLeftTodos', payload)
        }
    }
})
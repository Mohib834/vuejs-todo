import { State } from './types';
import { createModule } from 'direct-vuex'
import { moduleActionContext } from '../store';

const todoModule = createModule({
    state: (): State => {
        return {
            todos: [],
            completedTodos: [],
            isCompletedTodosEmpty: true,
            leftTodos: 0,
            category: 0,
        }
    },
    getters: {
        todos(state: State) {
            return state.todos
        },
        completedTodos(state: State) {
            return state.completedTodos
        },
        leftTodos(state: State) {
            return state.leftTodos
        },
        category(state: State) {
            return state.category
        },
        isCompletedTodosEmpty(state: State) {
            return state.isCompletedTodosEmpty
        }
    },
    mutations: {
        updateCategory(state: State, payload: number) {
            state.category = payload;
        },
        addTodo(state: State, payload: string) {
            state.todos.push({ todoText: payload, done: false });
            state.leftTodos++;
        },
        deleteTodo(state: State, payload: { todoIdx: number }) {
            if (!state.todos[payload.todoIdx].done) {
                state.leftTodos--;
            }
            state.todos = state.todos.filter(todo => todo !== state.todos[payload.todoIdx]);
            state.completedTodos.splice(payload.todoIdx, 1);

        },
        changeIsCompletedTodosEmpty(state: State, payload: boolean) {
            state.isCompletedTodosEmpty = payload;
        },
        clearCompletedTodo(state: State) {
            if (!state.isCompletedTodosEmpty) {
                for (let completedTodo of state.completedTodos) {
                    state.todos = state.todos.filter(todo => todo !== completedTodo);
                }
                state.completedTodos = [];
            }
        },
        checkLeftTodos(state: State, payload: { todoIdx: number }) {
            if (state.todos[payload.todoIdx].done) {
                state.leftTodos++;
            } else {
                state.leftTodos--;
            }

            state.todos[payload.todoIdx].done = !state.todos[payload.todoIdx].done
        }
    },
    actions: {
        updateCategory(context: any, payload: number) {
            const { commit } = modActionContext(context);
            commit.updateCategory(payload);
        },
        addTodo(context: any, payload: string) {
            const { commit } = modActionContext(context);
            commit.addTodo(payload);
        },
        deleteTodo(context: any, payload: { todoIdx: number }) {
            const { commit } = modActionContext(context);
            commit.deleteTodo(payload);
        },
        changeIsCompletedTodosEmpty(context: any, payload: boolean) {
            const { commit } = modActionContext(context);
            commit.changeIsCompletedTodosEmpty(payload);
        },
        clearCompletedTodo(context) {
            const { commit } = modActionContext(context);
            commit.clearCompletedTodo();
        },
        checkLeftTodos(context: any, payload: { todoIdx: number }) {
            const { commit } = modActionContext(context);
            commit.checkLeftTodos(payload)
        }
    }
})

export default todoModule;
// For Action types.
// Refer Direct-vuex documentation.
const modActionContext = (context: any) => moduleActionContext(context, todoModule);
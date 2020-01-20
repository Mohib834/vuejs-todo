export interface State {
    todos: Array<{ todoText: string, done: boolean }>;
    completedTodos: Array<{ todoText: string, done: true }>;
    isCompletedTodosEmpty: boolean;
    leftTodos: number;
    category: number;
}
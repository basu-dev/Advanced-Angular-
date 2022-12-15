import { createReducer, on } from "@ngrx/store";
import { TodoState } from "../todoState.interface";
import { addTodo, addTodoSuccess, getTodos, getTodosFailure, getTodosSuccess } from "./todo.actions";

const initialState: TodoState = {
    isLoading: false,
    todos: [],
    error: null,
    addLoading: false
};

export const reducer = createReducer(initialState,
    on(
        getTodos,
        (state) => ({ ...state, isLoading: true })
    ),
    on(
        getTodosSuccess,
        (state, { todos }) => ({ ...state, isLoading: false, todos, error: null })
    ),
    on(
        getTodosFailure,
        (state, { error }) => ({ ...state, isLoading: false, todos: [], error })
    ),
    on(
        addTodo,
        (state) => ({ ...state, addLoading: true })
    ),
    on(
        addTodoSuccess,
        (state, { todo }) => ({ ...state, todos: [todo, ...state.todos], addLoading: false })
    )
);
import { createAction, props } from "@ngrx/store";
import { Todo, TodoPayload } from "../todoState.interface";

export const getTodos = createAction('[Todo] Get Todos');
export const getTodosSuccess = createAction('[Todo] Get Todo Success', props<{ todos: Todo[]; }>());
export const getTodosFailure = createAction('[Todo] Get Todo Failure', props<{ error: string; }>());

export const addTodo = createAction('[Todo] Add Todo', props<{ payload: TodoPayload; }>());
export const addTodoSuccess = createAction('[Todo] Add Todo Success', props<{ todo: Todo; }>());

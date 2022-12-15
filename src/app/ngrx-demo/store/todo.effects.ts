import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { TodoService } from "../components/todo-list/todo.service";
import * as TodoActions from "./todo.actions";
@Injectable()
export class TodoEffects {
    constructor(private actions$: Actions, private _todoService: TodoService) { }

    getTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.getTodos),
            mergeMap(() =>
                this._todoService.fetchAllTodos$().pipe(
                    map((todos: any) => TodoActions.getTodosSuccess({ todos }),
                    ),
                    catchError((err) => of(TodoActions.getTodosFailure({ error: err.message })))
                )
            )
        )
    );

    addTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.addTodo),
            mergeMap(({ payload }) =>
                this._todoService.addTodo$(payload).pipe(
                    map((res) => TodoActions.addTodoSuccess({
                        todo: {
                            title: payload.title,
                            completed: false,
                            id: res.id
                        }
                    })),
                )
            ),
        )
    );
}
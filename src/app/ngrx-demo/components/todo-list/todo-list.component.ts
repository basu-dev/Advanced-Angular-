import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStoreInterface } from '../../appState.interface';
import { addLoadingSelector, addTodo, errorSelector, getTodos, isLoadingSelector, todosSelector } from "../../store";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  isLoading$ = this.store.select(isLoadingSelector);
  addLoading$ = this.store.select(addLoadingSelector);
  todos$ = this.store.select(todosSelector);
  error$ = this.store.select(errorSelector);
  title = "";

  constructor(private store: Store<AppStoreInterface>) { }

  ngOnInit(): void {
    this.store.dispatch(getTodos());
  }

  addTodo() {
    this.store.dispatch(addTodo({ payload: { title: this.title } }));
    this.title = "";
  }

}

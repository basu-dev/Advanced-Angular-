import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo, TodoPayload } from '../../todoState.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  fetchAllTodos$() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  addTodo$(payload: TodoPayload) {
    return this.http.post<{ id: number; }>('https://jsonplaceholder.typicode.com/todos', payload);
  }

}

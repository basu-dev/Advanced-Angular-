import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from "@ngrx/store";
import { TodoEffects } from './store/todo.effects';
import { reducer } from './store/todo.reducer';

const routes = [
  {
    path: '',
    component: TodoListComponent
  }
];

@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    StoreModule.forFeature('todos', reducer),
    EffectsModule.forFeature([TodoEffects])
  ]
})
export class NgrxDemoModule { }

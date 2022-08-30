import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components/components.component';



@NgModule({
  declarations: [
    ComponentsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ComponentsComponent
  ]

})
export class NotificationModule { }

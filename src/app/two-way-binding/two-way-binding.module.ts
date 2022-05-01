import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoWayBindingDirective } from './two-way-binding.directive';
import { TwoWayBindingTestComponent } from './test/two-way-binding-test/two-way-binding-test.component';



@NgModule({
  declarations: [
    TwoWayBindingDirective,
    TwoWayBindingTestComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TwoWayBindingTestComponent
  ]
})
export class TwoWayBindingModule { }

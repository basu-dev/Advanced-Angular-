import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPersistenceTestComponent } from './test/form-persistence-test/form-persistence-test.component';
import { FormPersistenceDirective } from './directives/form-persistence.directive';
import { ReactiveFormsModule } from '@angular/forms';

const components = [
  FormPersistenceTestComponent,
];

@NgModule({
  declarations: [
    components,
    FormPersistenceDirective
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [components]
})
export class FormPersistenceModule { }

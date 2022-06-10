import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextTestDirective, PTemplate, TemplateType } from './context-test/context-test.directive';



@NgModule({
  declarations: [
    ContextTestDirective,
    TemplateType,
    PTemplate
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContextTestDirective,
    TemplateType,
    PTemplate
  ]

})
export class StructuralDirectiveModule { }

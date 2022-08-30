import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NoPasteDirective } from './no-paste.directive';
import { NumberValidatorDirective } from './numberValidator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NumberValidatorDirective,
    NoPasteDirective
  ],
  exports: [NumberValidatorDirective,
    NoPasteDirective
  ]
})
export class InputValidatorModule { }

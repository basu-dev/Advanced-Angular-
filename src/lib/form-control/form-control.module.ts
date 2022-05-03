import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CustomFormControlComponent, GetValuePipe } from './components/custom-form-control/custom-form-control.component';

@NgModule({
    declarations: [
        CustomFormControlComponent, GetValuePipe
    ],
    imports: [
        CommonModule,
    ],
    exports: [CustomFormControlComponent]
})
export class CustomFormControlModule { }
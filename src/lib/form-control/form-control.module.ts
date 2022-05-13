import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CustomFormControlComponent, CUSTOM_FORM_CONFIG, GetValuePipe, IErrorConfig } from './components/custom-form-control/custom-form-control.component';

@NgModule({
    declarations: [
        CustomFormControlComponent, GetValuePipe
    ],
    imports: [
        CommonModule,
    ],
    providers: [
        {
            provide: CUSTOM_FORM_CONFIG,
            useValue: <IErrorConfig>{
                priority: false,
                onTouchedOnly: false
            }
        }
    ],
    exports: [CustomFormControlComponent]
})
export class CustomFormControlModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MediaMatchModule } from 'src/lib/media-match/media-match.module';
import { StructuralDirectiveModule } from 'src/lib/structural-directive/structural-directive.module';
import { HeightCalculateModule } from '../lib/height-calculate/height-calculate';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BroadcastChannelModule } from './broadcast-channel/broadcast-channel.module';
import { CustomFormControlTestComponent } from './components/custom-form-control-test/custom-form-control-test.component';
import { HeightCalculateTestComponent } from './components/height-calculate-test/height-calculate-test.component';
import { MatchMediaTestComponent } from './components/match-media-test/match-media-test.component';
import { FormPersistenceModule } from './form-persistence/form-persistence.module';
import { TwoWayBindingModule } from './two-way-binding/two-way-binding.module';
// import { IErrorConfig, NgxCustomFormErrorModule } from 'ngx-custom-form-error';
import { NgxFormErrorModule } from 'ngx-form-error';
import { CustomFormErrorModule, IErrorConfig } from 'src/lib/custom-form-error/custom-form-error';
import { InputValidatorModule } from './input-validator/input-validator.module';
import { NotificationModule } from './notification/notification.module';

@NgModule({
  declarations: [
    AppComponent,
    HeightCalculateTestComponent,
    MatchMediaTestComponent,
    CustomFormControlTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MediaMatchModule,
    FormPersistenceModule,
    HeightCalculateModule,
    BroadcastChannelModule,
    CustomFormErrorModule.rootConfig(<IErrorConfig>{
      onTouchedOnly: true,
      errorTextColor: 'var(--text-danger)',
      addErrorClassToElement: true,
      email: 'Please enter a valid email',
      required: (label: string) => label ? `${label} is required` : `It is required`,
      pattern: (label: string) => label ? `${label} doesn't match required pattern.` : `Doesn't match required pattern`,
      minLength: (label: string, data: { minLength: number; }) => label && data ? `${label} should contain at least ${data.minLength} characters.` : `${label} doesn\'t match minimum length criteria.`,
      maxLength: (label: string, data: { maxLength: number; }) => label && data ? `${label} cannot exceed more than ${data?.maxLength} characters.` : `${label} doesn\'t match maximum length criteria.`
    }),
    NgxFormErrorModule,
    TwoWayBindingModule,
    FormsModule,
    StructuralDirectiveModule,
    ReactiveFormsModule,
    NotificationModule,
    InputValidatorModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


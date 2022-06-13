import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BroadcastChannelModule } from './broadcast-channel/broadcast-channel.module';
import { HeightCalculateTestComponent } from './components/height-calculate-test/height-calculate-test.component';
import { MatchMediaTestComponent } from './components/match-media-test/match-media-test.component';
import { FormPersistenceModule } from './form-persistence/form-persistence.module';
import { HeightCalculateModule } from '../lib/height-calculate/height-calculate';
import { TwoWayBindingModule } from './two-way-binding/two-way-binding.module';
import { MediaMatchModule } from 'src/lib/media-match/media-match.module';
import { CustomFormControlTestComponent } from './components/custom-form-control-test/custom-form-control-test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StructuralDirectiveModule } from 'src/lib/structural-directive/structural-directive.module';
import { CustomFormErrorModule, IErrorConfig } from 'src/lib/custom-form-error/custom-form-error';

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
    TwoWayBindingModule,
    StructuralDirectiveModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


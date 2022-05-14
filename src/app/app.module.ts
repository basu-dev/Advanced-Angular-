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
import { MediaMatchModule } from 'src/lib/media-match/media-match';
import { CustomFormControlTestComponent } from './components/custom-form-control-test/custom-form-control-test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormControlModule, CUSTOM_FORM_CONFIG, IErrorConfig } from 'src/lib/custom-form-control/custom-form-control';

@NgModule({
  declarations: [
    AppComponent,
    HeightCalculateTestComponent,
    MatchMediaTestComponent,
    CustomFormControlTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MediaMatchModule,
    FormPersistenceModule,
    HeightCalculateModule,
    BroadcastChannelModule,
    CustomFormControlModule,
    TwoWayBindingModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: CUSTOM_FORM_CONFIG,
      useValue: <IErrorConfig>{
        onTouchedOnly: true,
        email: 'Please enter a valid email',
        required: (label: string) => label ? `${label} is required` : `It is required`,
        minLength: (label: string, data: { minLength: number; }) => label && data ? `${label} should contain at least ${data.minLength} characters.` : `${label} doesn\'t match minimum length criteria.`,
        maxLength: (label: string, data: { maxLength: number; }) => label && data ? `${label} cannot exceed ${data?.maxLength} characters.` : `${label} doesn\'t match maximum length criteria.`
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


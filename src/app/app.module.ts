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
import { CustomFormControlModule } from 'src/lib/form-control/form-control.module';
import { CUSTOM_FORM_CONFIG, IErrorConfig } from 'src/lib/form-control/components/custom-form-control/custom-form-control.component';

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
        required: "This field is required",
        email: "Please enter a valid email address",
        priority: true,
        onTouchedOnly: false
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


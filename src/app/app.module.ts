import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BroadcastChannelModule } from './broadcast-channel/broadcast-channel.module';
import { HeightCalculateTestComponent } from './components/height-calculate-test/height-calculate-test.component';
import { MatchMediaTestComponent } from './components/match-media-test/match-media-test.component';
import { FormPersistenceModule } from './form-persistence/form-persistence.module';
import { HeightCalculateModule } from './height-calculate/height-calculate';
import { MediaMatchModule } from './media-match/media-match';
import { TwoWayBindingModule } from './two-way-binding/two-way-binding.module';

@NgModule({
  declarations: [
    AppComponent,
    HeightCalculateTestComponent,
    MatchMediaTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MediaMatchModule,
    FormPersistenceModule,
    HeightCalculateModule,
    BroadcastChannelModule,
    TwoWayBindingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

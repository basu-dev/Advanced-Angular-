import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BroadcastChannelModule } from './broadcast-channel/broadcast-channel.module';
import { FormPersistenceModule } from './form-persistence/form-persistence.module';
import { HeightCalculateModule } from './height-calculate/height-calculate.module';
import { MediaMatchModule } from './media-match/media-match.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MediaMatchModule,
    FormPersistenceModule,
    HeightCalculateModule,
    BroadcastChannelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormPersistenceModule } from './form-persistence/form-persistence.module';
import { MediaMatchModule } from './media-match/media-match.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MediaMatchModule,
    FormPersistenceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

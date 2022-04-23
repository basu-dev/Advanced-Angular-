import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BroadcastChannelTestComponent } from './components/broadcast-channel-test/broadcast-channel-test.component';

const components = [
  BroadcastChannelTestComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule
  ],
  exports: [components]
})
export class BroadcastChannelModule { }

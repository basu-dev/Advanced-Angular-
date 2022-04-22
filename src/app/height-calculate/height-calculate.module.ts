import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeightCalculateTestComponent } from './test/height-calculate-test/height-calculate-test.component';
import { HeightCalculatePipe, HeightCalculateSyncPipe } from './pipe/height-calculate.pipe';

const components = [HeightCalculateTestComponent,
  HeightCalculatePipe,
  HeightCalculateSyncPipe,
];

@NgModule({
  declarations: [
    components,

  ],
  imports: [
    CommonModule
  ],
  exports: [components]
})
export class HeightCalculateModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchMediaTestComponent } from './test/match-media-test/match-media-test.component';
import { MediaMatchDirective } from './directives/media-match.directive';
import { MediaMatchPipe } from './pipe/media-match.pipe';



@NgModule({
  declarations: [
    MediaMatchDirective,
    MediaMatchPipe,
    MatchMediaTestComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MediaMatchPipe,
    MediaMatchDirective,
    MatchMediaTestComponent
  ]
})
export class MediaMatchModule { }

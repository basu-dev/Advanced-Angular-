import { NgModule } from "@angular/core";
import { MediaMatchAndDirective } from "./directives/media-match-and.directive";
import { MediaMatchOrDirective } from "./directives/media-match-or.directive";
import { MediaMatchRawDirective } from "./directives/media-match-raw.directive";
import { MediaMatchDirective } from "./directives/media-match.directive";
import { MediaMatchAsyncDefaultPipe } from "./pipes/media-match-async-default.pipe";
import { MediaMatchAsyncPipe } from "./pipes/media-match-async.pipe";
import { MediaMatchDefaultPipe } from "./pipes/media-match-default.pipe";
import { MediaMatchPipe } from "./pipes/media-match.pipe";

const directives = [
  MediaMatchDirective,
  MediaMatchOrDirective,
  MediaMatchAndDirective,
  MediaMatchRawDirective,
];

const pipes = [
  MediaMatchPipe,
  MediaMatchDefaultPipe,
  MediaMatchAsyncPipe,
  MediaMatchAsyncDefaultPipe,
];
@NgModule({
  declarations: [directives, pipes],
  exports: [directives, pipes]
})
export class MediaMatchModule { }
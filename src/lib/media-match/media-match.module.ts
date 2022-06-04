import { NgModule } from "@angular/core";
import { MediaMatchRawDirective } from "./directives/media-match-raw.directive";
import { MediaMatchDirective } from "./directives/media-match.directive";
import { MediaMatchAsyncDefaultPipe } from "./pipes/media-match-async-default.pipe";
import { MediaMatchAsyncPipe } from "./pipes/media-match-async.pipe";
import { MediaMatchDefaultPipe } from "./pipes/media-match-default.pipe";
import { MediaMatchPipe } from "./pipes/media-match.pipe";

const declarations = [
  MediaMatchDirective,
  MediaMatchRawDirective,
  MediaMatchPipe,
  MediaMatchDefaultPipe,
  MediaMatchAsyncPipe,
  MediaMatchAsyncDefaultPipe,
];
@NgModule({
  declarations,
  exports: declarations
})
export class MediaMatchModule { }
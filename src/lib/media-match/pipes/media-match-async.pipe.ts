import { Pipe, PipeTransform } from "@angular/core";
import { MediaMatchAsyncPipeBase } from "./base/media-match-async.base";

@Pipe({
    name: 'mediaMatchAsync'
})
export class MediaMatchAsyncPipe extends MediaMatchAsyncPipeBase implements PipeTransform {
    constructor() { super(); }
}
import { Pipe, PipeTransform } from "@angular/core";
import { MediaMatchAsyncPipeBase } from "./base/media-match-async.base";

@Pipe({
    name: 'mediaMatchAsyncDefault'
})
export class MediaMatchAsyncDefaultPipe extends MediaMatchAsyncPipeBase implements PipeTransform {
    constructor() { super(); }
}



import { Pipe, PipeTransform } from "@angular/core";
import { MediaMatchPipeBase } from "./media-match.base";

@Pipe({
    name: 'mediaMatchAsyncDefault'
})
export class MediaMatchAsyncDefaultPipe extends MediaMatchPipeBase implements PipeTransform {
    constructor() { super(); }
}



import { PipeTransform } from "@angular/core";
import { breakPoints, IMatchMedia } from "../breakpoints";

export class MediaMatchPipeBase implements PipeTransform {

    transform<T>(value: IMatchMedia, ...args: any[]): T {
        let matched = false;
        let globalKey = Object.keys(breakPoints)[0] as keyof IMatchMedia;
        for (let key of Object.keys(value)) {
            let newKey = key as keyof IMatchMedia;
            if (matchMedia(breakPoints[newKey]).matches) {
                globalKey = newKey;
                matched = true;
                break;
            } else {
                matched = false;
            }
        };
        if (matched) {
            return value[globalKey];
        }
        else {
            return args[0];
        }
    }
}
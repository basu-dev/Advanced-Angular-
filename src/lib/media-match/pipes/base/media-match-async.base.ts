import { PipeTransform } from "@angular/core";
import { Observable, switchMap, of } from "rxjs";
import { breakPoints, IMatchMedia } from "../../breakpoints";
import { windowResize } from "../../helper";

export class MediaMatchAsyncPipeBase implements PipeTransform {
    transform<T>(value: IMatchMedia, ...args: any[]): Observable<T> {
        return windowResize().pipe(
            switchMap(_ => {
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
                    return of(value[globalKey]);
                }
                else {
                    return of(args[0]);
                }
            })

        );
    }

}
import { Pipe, PipeTransform } from '@angular/core';
import { debounceTime, fromEvent, Observable, of, startWith, switchMap, throttle, throttleTime } from 'rxjs';

const breakPoints = {
  xs: "(max-width:599px)",
  sm: "(min-width:600px) and (max-width:768px)",
  md: "(min-width:769px) and (max-width:991px)",
  lg: "(min-width:992px) and (max-width:1200px)",
  xl: "(min-width:1200px)"
};

function windowResize() {
  return fromEvent(window, 'resize').pipe(
    debounceTime(100),
    startWith('')
  );
}
export interface IMatchMedia {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

@Pipe({
  name: 'mediaMatch'
})
export class MediaMatchPipe implements PipeTransform {
  transform(value: IMatchMedia, ...args: string[]): Observable<any> {
    return windowResize().pipe(
      switchMap(_ => {
        let matched = false;
        let globalKey: keyof IMatchMedia = 'xs';
        for (let key of Object.keys(value)) {
          let newKey: keyof IMatchMedia = key as keyof IMatchMedia;
          if (matchMedia(breakPoints[newKey]).matches) {
            globalKey = newKey;
            matched = true;
            break;
          } else {
            globalKey = 'xs';
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

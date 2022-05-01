import { Directive, Input, NgModule, Pipe, PipeTransform, TemplateRef, ViewContainerRef } from '@angular/core';
import { debounceTime, fromEvent, map, Observable, of, startWith, switchMap } from 'rxjs';

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

function mediaQueryChange(breakpoint: string): Observable<boolean> {
  let media = matchMedia(breakpoint);
  return fromEvent(media, 'change').pipe(
    map((e: any) => e.matches),
    startWith(media.matches)
  );
}

@Directive({
  selector: '[mediaMatch]'
})
export class MediaMatchDirective {

  @Input() mediaMatch!: keyof typeof breakPoints;

  constructor(private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit() {
    mediaQueryChange(breakPoints[this.mediaMatch]).subscribe(
      match => {
        if (match) {
          this.vcr.createEmbeddedView(this.tpl);
        } else {
          this.vcr.clear();
        }
      }
    );
  }
}

@NgModule({
  declarations: [
    MediaMatchDirective,
    MediaMatchPipe,
  ],
  exports: [
    MediaMatchPipe,
    MediaMatchDirective,
  ]
})
export class MediaMatchModule { }
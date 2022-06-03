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

type IMatchMedia = {
  [P in keyof typeof breakPoints]?: any
};


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
@Pipe({
  name: 'mediaMatchAsync'
})
export class MediaMatchAsyncPipe extends MediaMatchAsyncPipeBase implements PipeTransform {
  constructor() { super(); }
}

@Pipe({
  name: 'mediaMatchAsyncDefault'
})
export class MediaMatchAsyncDefaultPipe extends MediaMatchPipeBase implements PipeTransform {
  constructor() { super(); }
}

@Pipe({
  name: 'mediaMatch'
})
export class MediaMatchPipe extends MediaMatchPipeBase implements PipeTransform {
  constructor() { super(); }
}

@Pipe({
  name: 'mediaMatchDefault'
})
export class MediaMatchDefaultPipe extends MediaMatchPipeBase implements PipeTransform {
  constructor() { super(); }
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

@Directive({
  selector: '[mediaMatchRaw]'
})
export class MediaMatchRawDirective {

  @Input() mediaMatchRaw!: string;

  constructor(private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit() {
    mediaQueryChange(this.mediaMatchRaw).subscribe(
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
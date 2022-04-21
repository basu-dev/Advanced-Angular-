import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { fromEvent, map, Observable, startWith } from 'rxjs';

const breakPoints = {
  xs: "(max-width:599px)",
  sm: "(min-width:600px) and (max-width:768px)",
  md: "(min-width:769px) and (max-width:991px)",
  lg: "(min-width:992px) and (max-width:1200px)",
  xl: "(min-width:1200px)"
};

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

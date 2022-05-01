import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, merge, mergeMap, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[twoWay]'
})
export class TwoWayBindingDirective {

  @Input('twoWay') value: any;

  @Output('twoWayChange') emitter = new EventEmitter<any>();
  destroy$ = new Subject<void>();

  constructor(private el: ElementRef) {

  }

  ngAfterViewInit() {
    let onInput$ = fromEvent(this.el.nativeElement, 'input');
    this.el.nativeElement.value = this.value;

    onInput$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        map((event: any) => event.target.value)
      ).subscribe(
        value => {
          this.emitter.emit(value);
          console.log(value);
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

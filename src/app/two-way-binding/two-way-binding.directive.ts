import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[twoWay]'
})
export class TwoWayBindingDirective {

  @Input('twoWay') value: any;

  @Output('twoWayChange') emitter = new EventEmitter<any>();
  destroy$ = new Subject<void>();

  constructor(private el: ElementRef) {

  }
  ngOnInit() {
    this.el.nativeElement.innerText = this.value;
  }

  ngAfterViewInit() {
    let onInput$ = fromEvent(this.el.nativeElement, 'input');
    onInput$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        map((event: any) => event.target.innerText)
      ).subscribe(
        value => {
          this.emitter.emit(value);
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

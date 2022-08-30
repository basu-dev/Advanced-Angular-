import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[noPaste]'
})
export class NoPasteDirective {

  constructor(private el: ElementRef) { }

  @HostListener("window:paste", ["$event"]) onPaste(e: Event) {
    if (e.target !== this.el.nativeElement) return;
    e.preventDefault();
  }

}

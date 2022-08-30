import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberValidator]'
})
export class NumberValidatorDirective {
  regexPattern: RegExp = new RegExp(/^\d+$/);
  ignoreKeys = ["Enter", "Ctrl", "Alt", "Backspace"];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ["$event"]) onKeyDown(event: KeyboardEvent) {
    if (this.ignoreKeys.includes(event.key)) return;
    const current = this.el.nativeElement.value;
    const next = current + event.key;
    if (next && !String(next).match(this.regexPattern)) {
      event.preventDefault();
    }
  }

}


import { Directive, HostListener, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { fromEvent, take, takeWhile } from 'rxjs';

@Directive({
  selector: '[appFormPersistence]'
})
export class FormPersistenceDirective {

  @Input() name!: string;
  constructor(private control: ControlContainer) { }

  fromWindowUnloadEvent() {
    return fromEvent(window, 'beforeunload').pipe(
      takeWhile(() => this.formGroup?.dirty || false),
      take(1)
    );
  }

  @HostListener('submit')
  onSubmit() {
    localStorage.removeItem(this.name);
  }

  get formGroup() {
    return this.control.control;
  }


  ngAfterViewInit() {
    if (localStorage.getItem(this.name)) {
      this.formGroup?.patchValue(JSON.parse(localStorage.getItem(this.name)!));
    }
    this.fromWindowUnloadEvent().subscribe(
      val => {
        localStorage.setItem(this.name, JSON.stringify(this.control.value));
      }
    );
  }
}


import { Component, ContentChild, Directive, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

class Context<T>{
  valueA!: T;
  get $implicit() {
    return this.valueA;
  }
}

@Directive({
  selector: '[templateType]'
})
export class TemplateType<T>{
  @Input('templateType') value!: T;
  constructor() {
  }
  static ngTemplateContextGuard<T>(dir: TemplateType<T>, ctx: any):
    ctx is Context<T> {
    return true;
  }
}

@Directive({
  selector: '[pTemplate]'
})
export class PTemplate<T>{
  @Input('pTemplate') value!: T;
  constructor(private el: ElementRef<HTMLElement>) {
    console.log(el);
  }
}

@Component({
  selector: '[valueA]',
  template: `
 <ng-content></ng-content>
  <ng-container #container
    *ngTemplateOutlet="tpl; context: { $implicit: value }"
  ></ng-container>`
})
export class ContextTestDirective<T> {
  @Input('valueA') value!: { name: string; };
  @ViewChild('container', { read: ViewContainerRef }) private vcr!: ViewContainerRef;
  @ContentChild(PTemplate, { read: TemplateRef }) tpl!: TemplateRef<{ name: string; }>;

  constructor() {
  }
  ctx = new Context();

  ngOnInit() {
  }
  ngAfterContentInit() {
    console.log(this.tpl);

    // this.ctx.valueA = this.value;

    // this.vcr.createEmbeddedView(this.tpl, this.ctx);
  }

  static ngTemplateContextGuard<T>(dir: ContextTestDirective<T>, ctx: any):
    ctx is Context<T> {
    return true;
  }

}

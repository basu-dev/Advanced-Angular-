import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appContextTest]'
})
export class ContextTestDirective<T> {

  @Input('appContextTest') value!: T;
  constructor(private vcr: ViewContainerRef, private tpl: TemplateRef<T>) { }
  ngOnInit() {
    this.vcr.createEmbeddedView(this.tpl, this.value);
  }

}

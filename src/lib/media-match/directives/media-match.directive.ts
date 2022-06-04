import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { breakPoints } from "../breakpoints";
import { mediaQueryChange } from "../helper";

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


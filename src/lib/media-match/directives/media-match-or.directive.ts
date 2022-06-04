import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { breakPoints } from "../breakpoints";
import { mediaQueryChange } from "../helper";

@Directive({
    selector: '[mediaMatchOr]'
})
export class MediaMatchOrDirective {

    @Input() mediaMatchOr!: Array<keyof typeof breakPoints>;
    @Input() mediaMatchOrElse!: TemplateRef<unknown>;

    constructor(private tpl: TemplateRef<any>,
        private vcr: ViewContainerRef
    ) { }

    ngOnInit() {
        let query = this.mediaMatchOr.map(value => breakPoints[value]).join(', ');
        mediaQueryChange(query).subscribe(
            match => {
                this.vcr.clear();
                if (match) {
                    this.vcr.createEmbeddedView(this.tpl);
                } else if (this.mediaMatchOrElse) {
                    this.vcr.createEmbeddedView(this.mediaMatchOrElse);
                }
            }
        );
    }
}


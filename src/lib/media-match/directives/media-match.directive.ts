import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { breakPoints } from "../breakpoints";
import { mediaQueryChange } from "../helper";

@Directive({
    selector: '[mediaMatch]'
})
export class MediaMatchDirective {

    @Input() mediaMatch!: keyof typeof breakPoints | Array<keyof typeof breakPoints>;
    @Input() mediaMatchElse!: TemplateRef<unknown>;

    constructor(private tpl: TemplateRef<any>,
        private vcr: ViewContainerRef
    ) { }

    ngOnInit() {
        let query: string;
        if (Array.isArray(this.mediaMatch)) {
            query = this.mediaMatch.map(value => breakPoints[value]).join('and');
        } else {
            query = breakPoints[this.mediaMatch];
        }
        mediaQueryChange(query).subscribe(
            match => {
                this.vcr.clear();
                if (match) {
                    this.vcr.createEmbeddedView(this.tpl);
                } else if (this.mediaMatchElse) {
                    this.vcr.createEmbeddedView(this.mediaMatchElse);
                }

            }
        );
    }
}


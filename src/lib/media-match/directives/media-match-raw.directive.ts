import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { mediaQueryChange } from "../helper";

@Directive({
    selector: '[mediaMatchRaw]'
})
export class MediaMatchRawDirective {

    @Input() mediaMatchRaw!: string;
    @Input() mediaMatchRawElse!: TemplateRef<unknown>;

    constructor(private tpl: TemplateRef<any>,
        private vcr: ViewContainerRef
    ) { }

    ngOnInit() {
        mediaQueryChange(this.mediaMatchRaw).subscribe(
            match => {
                this.vcr.clear();
                if (match) {
                    this.vcr.createEmbeddedView(this.tpl);
                }
                else if (this.mediaMatchRawElse) {
                    this.vcr.createEmbeddedView(this.mediaMatchRawElse);
                }
            }
        );
    }
}


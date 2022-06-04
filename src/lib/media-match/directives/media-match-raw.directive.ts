import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { mediaQueryChange } from "../helper";

@Directive({
    selector: '[mediaMatchRaw]'
})
export class MediaMatchRawDirective {

    @Input() mediaMatchRaw!: string;

    constructor(private tpl: TemplateRef<any>,
        private vcr: ViewContainerRef
    ) { }

    ngOnInit() {
        mediaQueryChange(this.mediaMatchRaw).subscribe(
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


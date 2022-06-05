import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { breakPoints } from "../breakpoints";
import { mediaQueryChange } from "../helper";

@Directive({
    selector: '[mediaMatchAnd]'
})
export class MediaMatchAndDirective {

    private _destroy$ = new Subject<void>();

    @Input() mediaMatchAnd!: Array<keyof typeof breakPoints>;
    @Input() mediaMatchAndElse!: TemplateRef<unknown>;

    constructor(private tpl: TemplateRef<any>,
        private vcr: ViewContainerRef
    ) { }

    ngOnInit() {
        let query = this.mediaMatchAnd.map(value => breakPoints[value]).join(', ');
        mediaQueryChange(query).
            pipe(takeUntil(this._destroy$))
            .subscribe(
                match => {
                    this.vcr.clear();
                    if (match) {
                        this.vcr.createEmbeddedView(this.tpl);
                    } else if (this.mediaMatchAndElse) {
                        this.vcr.createEmbeddedView(this.mediaMatchAndElse);
                    }
                }
            );
    }

    ngOnDestroy() {
        this._destroy$.next();
    }
}


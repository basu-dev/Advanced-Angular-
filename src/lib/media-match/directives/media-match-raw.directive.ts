import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { mediaQueryChange } from "../helper";

@Directive({
    selector: '[mediaMatchRaw]'
})
export class MediaMatchRawDirective {

    private _destroy$ = new Subject<void>();

    @Input() mediaMatchRaw!: string;
    @Input() mediaMatchRawElse!: TemplateRef<unknown>;

    constructor(private tpl: TemplateRef<any>,
        private vcr: ViewContainerRef
    ) { }

    ngOnInit() {
        mediaQueryChange(this.mediaMatchRaw)
            .pipe(takeUntil(this._destroy$))
            .subscribe(
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

    ngOnDestroy() {
        this._destroy$.next();
    }
}


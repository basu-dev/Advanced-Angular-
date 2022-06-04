import { fromEvent, debounceTime, startWith, Observable, map } from "rxjs";

export function windowResize() {
    return fromEvent(window, 'resize').pipe(
        debounceTime(100),
        startWith('')
    );
}

export function mediaQueryChange(breakpoint: string): Observable<boolean> {
    let media = matchMedia(breakpoint);
    return fromEvent(media, 'change').pipe(
        map((e: any) => e.matches),
        startWith(media.matches)
    );
}
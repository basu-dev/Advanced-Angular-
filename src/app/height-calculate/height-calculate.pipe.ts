import { ElementRef, NgModule, Pipe, PipeTransform } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

function convertRemToPixels(rem: number) {
  return (
    rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
  );
}

function getElementHeight(data: {
  rootElement: HTMLElement;
  substractElements: Array<HTMLElement | string | number>;
}): number {
  let totalHeight = 0;
  data.substractElements.forEach((element) => {
    if (element) {
      let height = 0;
      if (element instanceof HTMLElement) {
        height = element.offsetHeight;
      } else if (typeof element === "string") {
        try {
          height =
            data.rootElement.querySelector<HTMLElement>(element)!.offsetHeight!;
        } catch (e) {
          throw (new Error(`Could not find element matching selector ${element}`));
        }
      } else height = convertRemToPixels(element);
      totalHeight += height;
    }
  });
  let height = data.rootElement.offsetHeight - totalHeight;
  return height;
}

function calculateHeight(items: Array<number | HTMLElement | string>): number {
  let root = items.shift();
  if (!(root instanceof HTMLElement)) throw (new Error(`${root} is not an instance of HTMLElement. First element passed to heightCalculate pipe should always be an HTMLElement`));
  let transformedItems: Array<number | HTMLElement | string> = items.map(item => {
    if (item instanceof ElementRef) {
      item = item.nativeElement as HTMLElement;
    }
    return item;
  });
  return getElementHeight({
    rootElement: root as HTMLElement,
    substractElements: transformedItems,
  });
}

export interface IHeightCalculate {
  heightCalculate$: Subject<boolean>;
}

@Pipe({
  name: 'heightCalculate'
})
export class HeightCalculatePipe implements PipeTransform {

  destroy$ = new Subject<void>();

  transform(items: Array<number | HTMLElement | string>, ...args: any[]): Promise<number> {
    return new Promise<number>((resolve) => {
      args[0]
        .pipe(
          takeUntil(this.destroy$),
          tap(data => {
            if (!data) {
              this.destroy$.next();
              this.destroy$.complete();
            }
          }),
        )
        .subscribe((_: any) => {
          resolve(calculateHeight([...items]));
        });
    });
  }
}

@Pipe({
  name: 'heightCalculateSync'
})
export class HeightCalculateSyncPipe implements PipeTransform {
  transform(items: Array<number | HTMLElement | string>, ...args: any[]): Promise<number> | number {
    return calculateHeight([...items]);
  }
}

@NgModule({
  declarations: [
    HeightCalculatePipe, HeightCalculateSyncPipe
  ],
  exports: [
    HeightCalculatePipe, HeightCalculateSyncPipe
  ]
})
export class HeightCalculateModule { }
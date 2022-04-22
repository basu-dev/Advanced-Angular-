import { ElementRef, Pipe, PipeTransform } from '@angular/core';

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
        height =
          data.rootElement.querySelector<HTMLElement>(element)?.offsetHeight || 0;
      } else height = convertRemToPixels(element);
      totalHeight += height;
    }
  });
  let height = data.rootElement.offsetHeight - totalHeight;
  return height;
}

function getHeight(items: Array<number | HTMLElement | string>): number {
  let root = items.shift();
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

@Pipe({
  name: 'heightCalculate'
})
export class HeightCalculatePipe implements PipeTransform {

  transform(items: Array<number | HTMLElement | string>, ...args: any[]): Promise<number> {
    return new Promise<number>((resolve) => {
      args[0].subscribe((_: any) => {
        resolve(getHeight([...items]));
      });
    });
  }

}

@Pipe({
  name: 'heightCalculateSync'
})
export class HeightCalculateSyncPipe implements PipeTransform {

  transform(items: Array<number | HTMLElement | string>, ...args: any[]): Promise<number> | number {
    return getHeight([...items]);
  }

}

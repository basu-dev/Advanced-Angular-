import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IHeightCalculate } from '../../../lib/height-calculate/height-calculate';

@Component({
  selector: 'app-height-calculate-test',
  templateUrl: './height-calculate-test.component.html',
  styleUrls: ['./height-calculate-test.component.scss']
})
export class HeightCalculateTestComponent implements OnInit, IHeightCalculate {

  heightCalculate$ = new Subject<boolean>();
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.heightCalculate$.next(true);
    }, 2000);
  }

  ngOnDestroy() {
    this.heightCalculate$.next(false);
    this.heightCalculate$.complete();
  }

}

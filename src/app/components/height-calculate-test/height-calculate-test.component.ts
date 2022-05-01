import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IHeightCalculate } from '../../height-calculate/height-calculate.pipe';

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

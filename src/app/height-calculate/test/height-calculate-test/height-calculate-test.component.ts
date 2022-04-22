import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-height-calculate-test',
  templateUrl: './height-calculate-test.component.html',
  styleUrls: ['./height-calculate-test.component.scss']
})
export class HeightCalculateTestComponent implements OnInit {

  heightCalculate$ = new Subject<void>();
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.heightCalculate$.next();
    }, 1000);
  }

  ngOnDestroy() {
    this.heightCalculate$.complete();
  }

}

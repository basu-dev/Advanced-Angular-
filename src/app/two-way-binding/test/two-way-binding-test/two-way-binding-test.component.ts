import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-way-binding-test',
  templateUrl: './two-way-binding-test.component.html',
  styleUrls: ['./two-way-binding-test.component.scss']
})
export class TwoWayBindingTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  name = "Basu";
  description = "";
}

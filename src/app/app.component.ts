import { Component } from '@angular/core';
type ReqType =
  {
    type: 'hello',
    message?: string;
  } |
  {
    type: 'bye',
    message: string;
  };

type argType<Type extends ReqType['type']> = Extract<ReqType, { type: Type; }> extends { message: string; } ? [first: Type, message: string] : [first: Type];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'advanced-angular';

  obj = { name: 'basu' };

  constructor() {
  }

  number = 3;

  test<Type extends ReqType['type']>(...args: argType<Type>) {
    const first = args[0];
    const message = args[1];
    if (message) console.log(first, message);
    else console.log(first);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  input(e: any) {
    // console.log(e.target.innerText);
    console.log(this.obj.name);
  }


}


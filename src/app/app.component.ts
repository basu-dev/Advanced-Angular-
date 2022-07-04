import { Component } from '@angular/core';

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
  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  input(e: any) {
    // console.log(e.target.innerText);
    console.log(this.obj.name);
  }


}


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.showNotification();
  }
  public showNotification(): void {
    const notification = new Notification('', {
      body: 'This is a JavaScript Notification API demo',
      icon: 'assets/2.jpg',
    });

    setTimeout(() => {
      notification.close();
    }, 1000000000000 * 1000);

  }

}

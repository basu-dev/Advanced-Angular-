import { Component, OnInit } from '@angular/core';
import { BroadcastChannelService } from '../../broadcast-channel.service';

@Component({
  selector: 'app-broadcast-channel-test',
  templateUrl: './broadcast-channel-test.component.html',
  styleUrls: ['./broadcast-channel-test.component.scss']
})
export class BroadcastChannelTestComponent implements OnInit {

  constructor(private _channelS: BroadcastChannelService) { }

  darkMode = false;

  ngOnInit(): void {
    this._channelS.darkModeCh$.stream.subscribe(value => {
      this.darkMode = value;
    });
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this._channelS.darkModeCh$.send(this.darkMode);
  }
}

import { Injectable } from "@angular/core";
import { fromEvent, map, Subject } from "rxjs";

export enum BroadcastChannels {
    DARK_MODE = 'dark-mode'
}

@Injectable({
    providedIn: 'root'
})
export class BroadcastChannelService {

    constructor() {
    }

    private darkModeChannel = new BroadcastChannel(BroadcastChannels.DARK_MODE);

    darkModeCh$ = {
        stream: fromEvent(this.darkModeChannel, 'message').pipe(map((data: any) => data.data as boolean)),
        send: (value: boolean) => this.darkModeChannel.postMessage(value),
        close: () => this.darkModeChannel.close()
    };

}
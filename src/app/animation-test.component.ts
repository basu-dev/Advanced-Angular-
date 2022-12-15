import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";

@Component({
    selector: 'app-child',
    template: `
    <div appTest [@upDown]="left?'up':'down'">Child</div>    
    `,
    animations: [
        trigger('upDown', [
            state('up', style({
                'margin-top': '-1rem'
            })),
            state('down', style({
                'margin-top': '0'
            })),
            transition("up=>down", [
                animate(".2s ease-in-out")
            ]),
            transition("down=>up", [
                animate(".2s ease-in-out")
            ])
        ])
    ]
})
export class AnimationTest {

    constructor() {
    }
    left = true;
    ngOnInit() {
        setTimeout(() => {
            this.left = !this.left;
        }, 2000);

    }
}
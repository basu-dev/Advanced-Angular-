import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastChannelTestComponent } from './broadcast-channel-test.component';

describe('BroadcastChannelTestComponent', () => {
  let component: BroadcastChannelTestComponent;
  let fixture: ComponentFixture<BroadcastChannelTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastChannelTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastChannelTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

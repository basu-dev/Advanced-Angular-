import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchMediaTestComponent } from './match-media-test.component';

describe('MatchMediaTestComponent', () => {
  let component: MatchMediaTestComponent;
  let fixture: ComponentFixture<MatchMediaTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchMediaTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchMediaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

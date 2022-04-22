import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeightCalculateTestComponent } from './height-calculate-test.component';

describe('HeightCalculateTestComponent', () => {
  let component: HeightCalculateTestComponent;
  let fixture: ComponentFixture<HeightCalculateTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeightCalculateTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeightCalculateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

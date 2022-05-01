import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWayBindingTestComponent } from './two-way-binding-test.component';

describe('TwoWayBindingTestComponent', () => {
  let component: TwoWayBindingTestComponent;
  let fixture: ComponentFixture<TwoWayBindingTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoWayBindingTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoWayBindingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

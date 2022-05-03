import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormControlTestComponent } from './custom-form-control-test.component';

describe('CustomFormControlTestComponent', () => {
  let component: CustomFormControlTestComponent;
  let fixture: ComponentFixture<CustomFormControlTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormControlTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormControlTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

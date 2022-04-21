import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPersistenceTestComponent } from './form-persistence-test.component';

describe('FormPersistenceTestComponent', () => {
  let component: FormPersistenceTestComponent;
  let fixture: ComponentFixture<FormPersistenceTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPersistenceTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPersistenceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

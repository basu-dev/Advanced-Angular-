import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-form-control-test',
  templateUrl: './custom-form-control-test.component.html',
  styleUrls: ['./custom-form-control-test.component.scss'],
})
export class CustomFormControlTestComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  form!: FormGroup;
  MAX_LENGTH: number = 20;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [, [Validators.required, Validators.maxLength(this.MAX_LENGTH),
      Validators.minLength(5)
      ]],

      password: [, [Validators.required, Validators.minLength(5),
      Validators.pattern(/[a-z]+-[a-z]+/)
      ]]
    });
  }
}

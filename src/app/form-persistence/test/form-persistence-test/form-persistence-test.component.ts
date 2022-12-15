import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-persistence-test',
  templateUrl: './form-persistence-test.component.html',
  styleUrls: ['./form-persistence-test.component.scss']
})
export class FormPersistenceTestComponent implements OnInit {

  constructor(private fb: UntypedFormBuilder) { }

  form!: UntypedFormGroup;
  ngOnInit(): void {

    this.form = this.fb.group({
      name: [],
      password: []
    });
  }

}

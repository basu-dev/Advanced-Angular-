import { Component, ContentChild, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { distinctUntilChanged, Observable, of, switchMap } from 'rxjs';

export interface IError {
  required?: string,
  nullValidation?: string,
  requiredTrue?: string,
  min?: string,
  max?: string,
  minLength?: string,
  maxLength?: string,
  email?: string,
  pattern?: string;
}

@Component({
  selector: 'c-form-control',
  templateUrl: './custom-form-control.component.html',
  styleUrls: ['./custom-form-control.component.scss']
})
export class CustomFormControlComponent implements OnInit {

  constructor() { }


  @Input('errorMessages') _data!: IError;
  @Input() maxLength!: number;
  @ContentChild(FormControlName) control!: FormControlName;

  data: any;

  hasError$!: Observable<any>;
  dataKeys!: string[];

  ngOnInit(): void {
    this.formatInputData();
  }

  formatInputData() {
    try {
      this.data = {};
      for (let [key, value] of Object.entries(this._data)) {
        this.data[key.toLocaleLowerCase()] = value;
      }
      this.dataKeys = Object.keys(this.data);
    } catch {
      this.dataKeys = [];
    }
  }

  ngAfterContentInit() {
    if (!this.dataKeys.length) return;
    let error: any = {};
    this.hasError$ = this.control.statusChanges?.pipe(
      distinctUntilChanged(),
      switchMap(() => of(
        this.dataKeys.reduce((acc, key) => {
          acc[key] = this.control.errors ? this.control.errors[key] : null;
          return acc;
        }, error)
      )),
    ) as Observable<any>;
  }
}

@Pipe({
  name: 'fromObject'
})
export class GetValuePipe implements PipeTransform {

  transform(item: string, ...args: any[]): any {
    let data = args[0];
    return data[item];
  }
}

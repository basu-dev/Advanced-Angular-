import { Component, ContentChild, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { distinctUntilChanged, Observable, of, switchMap } from 'rxjs';

export interface IError {
  required?: string,
  min?: string,
  max?: string,
  minlength?: string,
  maxlength?: string,
  email?: string,
  pattern?: string;
}


@Component({
  selector: 'app-custom-form-control',
  templateUrl: './custom-form-control.component.html',
  styleUrls: ['./custom-form-control.component.scss']
})
export class CustomFormControlComponent implements OnInit {

  constructor() { }

  @Input() data!: IError;
  @Input() maxLength!: number;
  @ContentChild(FormControlName) control!: FormControlName;

  hasError$!: Observable<any>;
  dataKeys!: string[];

  ngOnInit(): void {
    this.dataKeys = Object.keys(this.data) || [];
  }

  ngAfterContentInit() {
    let error: any = {};
    this.hasError$ = this.control.statusChanges?.pipe(
      distinctUntilChanged((x: string, y: string) => x.length == y.length),
      switchMap(() => of(
        this.dataKeys.reduce((acc, key) => {
          acc[key] = this.control.errors ? this.control.errors[key] : null;
          console.log(acc[key]);
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

import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { combineLatest, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';

export interface IError {
  required?: string,
  nullValidator?: string,
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
  styleUrls: ['./custom-form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFormControlComponent implements OnInit {

  constructor() { }


  @ContentChild(FormControlName) control!: FormControlName;

  /**Max Length count is used to show remaining letters in right hand side of form error area eg. [5 / 10] */
  @Input() maxLengthCount!: number;
  @Input('errorMessages') _data: IError = <IError>{};

  @Input() required!: string;
  @Input() maxLength?: string;
  @Input() minLength?: string;
  @Input() min?: string;
  @Input() max?: string;
  @Input() email?: string;
  @Input() pattern?: string;
  @Input() requiredTrue?: string;
  @Input() nullValidator?: string;

  /** if priority is true => in case of multiple errors, we only show first error and make other errors null so that only higher priority error is shown in screen
  * else we will show all the errors
  **/
  @Input() priority = false;
  /** If onTouchedOnly flag is on, we only show errors after the form is touched and has errors */
  @Input() onTouchedOnly = false;


  data!: any;

  hasError$!: Observable<any>;
  dataKeys!: string[];

  ngOnInit(): void {
    this.init();
    this.formatInputData();
  }

  init() {
    if (this.required) this._data['required'] = this.required;
    if (this.maxLength) this._data['maxLength'] = this.maxLength;
    if (this.minLength) this._data['minLength'] = this.minLength;
    if (this.max) this._data['max'] = this.max;
    if (this.min) this._data['min'] = this.min;
    if (this.email) this._data['email'] = this.email;
    if (this.pattern) this._data['pattern'] = this.pattern;
    if (this.requiredTrue) this._data['requiredTrue'] = this.requiredTrue;
    if (this.nullValidator) this._data['nullValidator'] = this.nullValidator;
  }

  /** We need to make all the keys of errorMessages to be lowerCase for further processing. This is what we do in this function */
  formatInputData() {
    try {
      this.data = <IError>{};
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
    this.matchFormErrorsWithInputErrorMessages();
  }

  matchFormErrorsWithInputErrorMessages() {
    // This observable is used to look any errors when the form is touched. This stream emits `true` at the start
    // if `this.onTouchOnly=false` and will only emit `true` after the control is touched if `this.onTouchOnly=true`.
    const touched$ = new Observable<any>((subscribe => {
      if (this.onTouchedOnly) {
        this.control.valueAccessor?.registerOnTouched(() => subscribe.next(true));
      } else {
        subscribe.next(true);
      }
    })).pipe(distinctUntilChanged());

    this.hasError$ = combineLatest(touched$, this.control.statusChanges!).pipe(
      switchMap(() => of(this.control.errors)),
      distinctUntilChanged((x, y) => {
        let xProp = Object.getOwnPropertyNames(x);
        let yProp = Object.getOwnPropertyNames(y);
        if (xProp.length !== yProp.length) return false;
        return xProp.every(prop => yProp.includes(prop));
      }),
      switchMap(_ => of(
        this.dataKeys.reduce((acc, key) => {
          let accProps = Object.getOwnPropertyNames(acc);
          // if priority is on => in case of multiple errors, we only use first error and make other errors null so that only higher priority error is shown in screen
          // else we will show all the errors
          if (this.priority) {
            /** It is true if one of the errors is already true, which if true we make other error values null so that only one error is shown */
            let alreadyOne = accProps.length && accProps.some(prop => acc[prop]);
            acc[key] = alreadyOne ? null : this.control.errors ? this.control.errors[key] : null;
          } else {
            acc[key] = this.control.errors ? this.control.errors[key] : null;
          }
          return acc;
        }, <any>{})
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


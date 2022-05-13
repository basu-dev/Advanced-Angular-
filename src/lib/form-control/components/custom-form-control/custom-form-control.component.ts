import { ChangeDetectionStrategy, Component, ContentChild, Inject, InjectionToken, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { combineLatest, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';

export interface IError {
  required?: string | null,
  nullValidator?: string | null,
  requiredTrue?: string | null,
  min?: string | null,
  max?: string | null,
  minLength?: string | null,
  maxLength?: string | null,
  email?: string | null,
  pattern?: string | null;
}

export interface IErrorConfig extends IError {
  priority?: boolean,
  onTouchedOnly?: boolean,
}

export const CUSTOM_FORM_CONFIG = new InjectionToken('Custom-Form-Config');

@Component({
  selector: 'c-form-control',
  templateUrl: './custom-form-control.component.html',
  styleUrls: ['./custom-form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFormControlComponent implements OnInit {

  constructor(@Inject(CUSTOM_FORM_CONFIG) private config: IErrorConfig) {
  }

  @ContentChild(FormControlName) control!: FormControlName;

  /**Max Length count is used to show remaining letters in right hand side of form error area eg. [5 / 10] */
  @Input() maxLengthCount!: number;
  @Input('errorMessages') _data: IError = <IError>{};

  @Input() required?: string | null;
  @Input() maxLength?: string | null;
  @Input() minLength?: string | null;
  @Input() min?: string | null;
  @Input() max?: string | null;
  @Input() email?: string | null;
  @Input() pattern?: string | null;
  @Input() requiredTrue?: string | null;
  @Input() nullValidator?: string | null;

  /** if priority is true => in case of multiple errors, we only show first error and make other errors null so that only higher priority error is shown in screen
  * else we will show all the errors
  * It only works if you provide all the validators in object form. If you pass any of the error message as normal input, we cannot determine
  * which error to show and which not in case of two errors occuring at same time. In that case priority is automatically set to false.
  * 
  **/
  @Input() priority!: boolean;
  /** If onTouchedOnly flag is on, we only show errors after the form is touched and has errors */
  @Input() onTouchedOnly!: boolean;


  data!: any;

  hasError$!: Observable<any>;
  dataKeys!: string[];

  ngOnInit(): void {
    this.priority = this.priority ?? this.config.priority;
    this.onTouchedOnly = this.onTouchedOnly ?? this.config.onTouchedOnly;
    this.init();
    this.formatInputData();
  }

  init() {
    const rule = (properties: Array<keyof IError>) => {

      properties.forEach(property => {
        /*
      Readable form of code for one property 'required'
      if (this.required) {
        this._data['required'] = this.required;
       } else if (this.config.required) {
        this._data['required'] = this._data['required'] ?? this.config.required;
       }
         */
        if (this[`${property}`] || this[`${property}`] === null) {
          this._data[`${property}`] = this[`${property}`];
          this.priority = false;
        } else if (this.config[`${property}`]) {
          this._data[`${property}`] = this._data[`${property}`] ?? this.config[`${property}`];
        }
      });
    };

    rule(['required', 'email', 'max', 'maxLength', 'min', 'minLength', 'nullValidator', 'pattern', 'requiredTrue']);
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
    const touched$ = new Observable<boolean>((subscribe => {
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

};

@Pipe({
  name: 'fromObject'
})
export class GetValuePipe implements PipeTransform {

  transform(item: string, ...args: any[]): any {
    let data = args[0];
    return data[item];
  }
}


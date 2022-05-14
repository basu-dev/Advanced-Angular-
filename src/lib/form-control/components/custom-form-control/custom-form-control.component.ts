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

export interface IErrorConfig {

  required?: Function | string;
  nullValidator?: Function | string;
  requiredTrue?: Function | string;
  min?: Function | string;
  max?: Function | string;
  minLength?: Function | string;
  maxLength?: Function | string;
  email?: Function | string;
  pattern?: Function | string;
  priority?: boolean;
  onTouchedOnly?: boolean;
}

export const CUSTOM_FORM_CONFIG = new InjectionToken('Custom-Form-Config');

@Component({
  selector: 'c-form-control',
  templateUrl: './custom-form-control.component.html',
  styleUrls: ['./custom-form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFormControlComponent implements OnInit {

  constructor(@Inject(CUSTOM_FORM_CONFIG) private config: IErrorConfig) { }

  @ContentChild(FormControlName) control!: FormControlName;

  /**Max Length count is used to show remaining letters in right hand side of form error area eg. [5 / 10] */
  @Input() maxLengthCount!: number;
  @Input('errorMessages') _messages: IError = <IError>{};

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
  **/
  @Input() priority!: boolean;
  /** If onTouchedOnly flag is on, we only show errors after the form is touched and has errors */
  @Input() onTouchedOnly!: boolean;
  @Input() data!: any;

  messages!: any;
  hasError$!: Observable<any>;
  messagesKeys!: string[];
  ngOnInit(): void {
    this.priority = this.priority ?? this.config.priority;
    this.onTouchedOnly = this.onTouchedOnly ?? this.config.onTouchedOnly;
    this.initmessages();
    this.formatInputmessages();
  }

  initmessages() {
    const init = (properties: Array<keyof IError>) => {
      properties.forEach(property => {
        /*Readable form of code for property='required' for the code below
        if (this.required ||| this.required===null) {
            this._messages['required'] = this.required;
            this.priority = false;
        } else if (this.config.required) {
           if (this.config.required instanceof Function) {
            let configFn = this.config.required as Function;
            this._messages.required = this._messages.required ?? configFn(this.data);
          } else {
            this._messages.required = this._messages.required ?? this.config.required as string;
          }
       }*/
        if (this[`${property}`] || this[`${property}`] === null) {
          this._messages[`${property}`] = this[`${property}`];
          this.priority = false;
        } else if (this.config[`${property}`]) {
          if (this.config[`${property}`] instanceof Function) {
            let configFn = this.config[`${property}`] as Function;
            this._messages[`${property}`] = this._messages[`${property}`] ?? configFn(this.data);
          } else {
            this._messages[`${property}`] = this._messages[`${property}`] ?? this.config[`${property}`] as string;
          }
        }
      });
    };

    init(['required', 'email', 'max', 'maxLength', 'min', 'minLength', 'nullValidator', 'pattern', 'requiredTrue']);
  }

  /** We need to make all the keys of errorMessages to be lowerCase for further processing. This is what we do in this function */
  formatInputmessages() {
    try {
      this.messages = <IError>{};
      for (let [key, value] of Object.entries(this._messages)) {
        this.messages[key.toLocaleLowerCase()] = value;
      }
      this.messagesKeys = Object.keys(this.messages);
    } catch {
      this.messagesKeys = [];
    }
  }

  ngAfterContentInit() {
    if (!this.messagesKeys.length) return;
    this.matchFormErrorsWithInputErrorMessages();
  }

  hasTwoObjectsSameProps(x: Object, y: Object): boolean {
    let xProp: string[], yProp: string[];
    try {
      xProp = Object.getOwnPropertyNames(x);
    } catch {
      xProp = [];
    }
    try {
      yProp = Object.getOwnPropertyNames(y);
    } catch {
      yProp = [];
    }
    if (xProp.length !== yProp.length) return false;
    return xProp.every((prop: string) => yProp.includes(prop));
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
      distinctUntilChanged((x, y) => this.hasTwoObjectsSameProps(x as Object, y as Object)),
      switchMap(_ => of(
        this.messagesKeys.reduce((acc, key) => {
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
    let messages = args[0];
    return messages[item];
  }
}


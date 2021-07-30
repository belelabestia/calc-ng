import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Digit, DIGITS, Digits } from '../utils/digits';
import { Operator, Operators } from '../utils/operators';
import { SpecialButtons } from './special-button/special-buttons';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css']
})
export class KeysComponent {
  @Output() digit = new EventEmitter<Digit>();
  @Output() decimalSeparator = new EventEmitter<void>();
  @Output() operator = new EventEmitter<Operator>();
  @Output() equals = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    @Inject(DIGITS) readonly digits: Digits,
    readonly SpecialButtons: SpecialButtons,
    readonly Operators: Operators
  ) { }
}

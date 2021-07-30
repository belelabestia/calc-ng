import { Component, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { Digit } from 'src/app/utils/digits';

@Component({
  selector: 'app-digit-button',
  templateUrl: './digit-button.component.html',
  styleUrls: ['./digit-button.component.css']
})
export class DigitButtonComponent {
  @Input() digit: Digit | undefined;
  @HostBinding('class') class = 'button digit';
  @HostBinding('attr.data-digit') get dataDigit() { return this.digit; }
}

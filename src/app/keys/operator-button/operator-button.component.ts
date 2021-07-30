import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Operator } from 'src/app/utils/operators';

@Component({
  selector: 'app-operator-button',
  templateUrl: './operator-button.component.html',
  styleUrls: ['./operator-button.component.css']
})
export class OperatorButtonComponent {
  @Input() operator: Operator | undefined;
  @HostBinding('class') class = 'button operator';
  @HostBinding('attr.data-symbol') get dataSymbol() { return this.operator?.symbol; }
}

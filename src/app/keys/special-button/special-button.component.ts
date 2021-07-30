import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { SpecialButton } from './special-buttons';

@Component({
  selector: 'app-special-button',
  templateUrl: './special-button.component.html',
  styleUrls: ['./special-button.component.css']
})
export class SpecialButtonComponent {
  @Input() type: SpecialButton | undefined;
  @HostBinding('class') get class() { return `button ${this.type?.name}`; }
}

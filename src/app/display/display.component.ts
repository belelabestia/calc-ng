import { Component, Input } from '@angular/core';
import { Operator } from '../utils/operators';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  @Input() partial: string = '';
  @Input() operator: Operator | undefined;
  @Input() value: string = '';
}

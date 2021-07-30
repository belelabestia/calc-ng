import { Component } from '@angular/core';
import { Digit } from './utils/digits';
import { Operator } from './utils/operators';
import { Actions, StateService } from './utils/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private Actions: Actions, public state: StateService) { }

  onDigit(digit: Digit): void { this.state.dispatch.next(this.Actions.AddDigit(digit)); }
  onDecimalSeparator(): void { this.state.dispatch.next(this.Actions.AddDecimalSeparator); }
  onOperator(operator: Operator): void { this.state.dispatch.next(this.Actions.AddOperator(operator)); }
  onEquals(): void { this.state.dispatch.next(this.Actions.Result); }
  onCancel(): void { this.state.dispatch.next(this.Actions.Reset); }
}

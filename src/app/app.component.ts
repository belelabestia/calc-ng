import { Component } from '@angular/core';
import { Actions } from './utils/action';
import { AppService } from './app.service';
import { Digit } from './utils/digits';
import { Operator } from './utils/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private Actions: Actions, public app: AppService) { }

  onDigit(digit: Digit): void { this.app.dispatch(this.Actions.AddDigit(digit)); }
  onDecimalSeparator(): void { this.app.dispatch(this.Actions.AddDecimalSeparator); }
  onOperator(operator: Operator): void { this.app.dispatch(this.Actions.AddOperator(operator)); }
  onEquals(): void { this.app.dispatch(this.Actions.Result); }
  onCancel(): void { this.app.dispatch(this.Actions.Reset); }
}

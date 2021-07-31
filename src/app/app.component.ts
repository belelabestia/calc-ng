import { Component } from '@angular/core';
import { ActionInstances } from './utils/action';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    readonly app: AppService,
    readonly actions: ActionInstances
  ) { }
}

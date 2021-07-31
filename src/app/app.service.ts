import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { scan, shareReplay, startWith } from 'rxjs/operators';
import { Action } from './utils/action';
import { Operators } from './utils/operators';
import { State } from './utils/state';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly initialState: State = new State({
    partial: "0",
    operator: this.Operators.Init,
    value: "",
    reset: false
  });

  private action = new Subject<Action>();

  readonly state = this.action.asObservable().pipe(
    scan(this.reduce, this.initialState),
    startWith(this.initialState),
    shareReplay(1)
  );

  constructor(private Operators: Operators) { }

  dispatch(action: Action): void {
    this.action.next(action);
  }

  private reduce(prev: State, action: Action) {
    return action.apply(prev);
  }
}

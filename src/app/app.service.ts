import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { scan, shareReplay, startWith } from 'rxjs/operators';
import { Action } from './utils/action';
import { State } from './utils/state';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private action = new Subject<Action>();

  readonly state = this.action.asObservable().pipe(
    scan(this.reduce, State.initial()),
    startWith(State.initial()),
    shareReplay(1)
  );

  dispatch(action: Action): void {
    this.action.next(action);
  }

  private reduce(prev: State, action: Action) {
    return action.apply(prev);
  }
}

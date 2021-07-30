import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { scan, shareReplay, startWith } from 'rxjs/operators';
import { Digit } from './digits';
import { Operator, Operators } from './operators';

interface StateProps {
  readonly partial: string;
  readonly operator: Operator;
  readonly value: string;
  readonly reset: boolean;
}

class State implements StateProps {
  get partial(): string { return this.props.partial; }
  get operator(): Operator { return this.props.operator; }
  get value(): string { return this.props.value; }
  get reset(): boolean { return this.props.reset; }

  constructor(readonly props: StateProps) { }

  getProps(initial: State): StateProps {
    return this.props.reset ? initial.props : this.props;
  }

  calc(): string {
    return String(this.props.operator.fn(Number(this.props.partial), Number(this.props.value)));
  }
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  readonly initial: State = new State({
    partial: "0",
    operator: this.Operators.Init,
    value: "",
    reset: false
  });

  readonly dispatch = new Subject<Action>();

  readonly stream = this.dispatch.asObservable().pipe(
    scan((prev: State, action: Action) => action.apply(prev), this.initial),
    startWith(this.initial),
    shareReplay(1)
  );

  constructor(private Operators: Operators) { }
}

export interface Action {
  apply(state: State): State;
}

class AddDecimalSeparator implements Action {
  constructor(private initial: State) { }

  apply(state: State): State {
    return new State({
      ...state.getProps(this.initial),
      value: state.reset
        ? "0."
        : (state.value === "" ? "0" : state.value) + (state.value.includes(".") ? "" : ".")
    });
  }
}

class AddOperator implements Action {
  constructor(private operator: Operator) { }

  apply(state: State): State {
    return new State({
      partial:
        !state.reset && state.value !== "" ? state.calc() : state.partial,
      value: "",
      operator: this.operator,
      reset: false,
    });
  }
}

class AddDigit implements Action {
  constructor(private digit: Digit, private initial: State) { }

  apply(state: State): State {
    return new State({
      ...state.getProps(this.initial),
      value: state.reset
        ? this.digit
        : (state.value === "0" ? "" : state.value) + this.digit,
    });
  }
}

class Result implements Action {
  constructor(private initial: State) { }

  apply(state: State): State {
    return new State({
      ...state.getProps(this.initial),
      partial: state.calc(),
      reset: true,
    });
  }
}

class Reset implements Action {
  constructor(private initial: State) { }

  apply(_: State): State {
    return this.initial;
  }
}

@Injectable({
  providedIn: 'root'
})
export class Actions {
  AddDecimalSeparator = new AddDecimalSeparator(this.stateService.initial);
  Result = new Result(this.stateService.initial);
  Reset = new Reset(this.stateService.initial);

  constructor(private stateService: StateService) { }

  AddOperator(operator: Operator) { return new AddOperator(operator); }
  AddDigit(digit: Digit) { return new AddDigit(digit, this.stateService.initial); }
}

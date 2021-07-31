import { Injectable } from "@angular/core";
import { State } from "./state";
import { AppService } from "../app.service";
import { Digit } from "./digits";
import { Operator } from "./operators";

export interface Action {
  apply(state: State): State;
}

class AddDecimalSeparator implements Action {
  constructor(private initial: State) { }

  apply(state: State): State {
    return new State({
      ...state.resetIfNeeded(this.initial),
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
      ...state.resetIfNeeded(this.initial),
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
      ...state.props,
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
  AddDecimalSeparator = new AddDecimalSeparator(this.app.initialState);
  Result = new Result(this.app.initialState);
  Reset = new Reset(this.app.initialState);

  constructor(private app: AppService) { }

  AddOperator(operator: Operator) { return new AddOperator(operator); }
  AddDigit(digit: Digit) { return new AddDigit(digit, this.app.initialState); }
}

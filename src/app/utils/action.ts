import { State } from "./state";
import { Digit } from "./digits";
import { Operator } from "./operators";
import { Injectable } from "@angular/core";

export interface Action {
  apply(state: State): State;
}

class AddDecimalSeparator implements Action {
  apply(state: State): State {
    return new State({
      ...state.resetIfNeeded(),
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
  constructor(private digit: Digit) { }

  apply(state: State): State {
    return new State({
      ...state.resetIfNeeded(),
      value: state.reset
        ? this.digit
        : (state.value === "0" ? "" : state.value) + this.digit,
    });
  }
}

class Result implements Action {
  apply(state: State): State {
    return new State({
      ...state.props,
      partial: state.calc(),
      reset: true,
    });
  }
}

class Reset implements Action {
  apply(_: State): State {
    return State.initial();
  }
}

export const Actions = {
  AddDecimalSeparator,
  Result,
  Reset,
  AddOperator,
  AddDigit
}

@Injectable({
  providedIn: 'root'
})
export class ActionInstances {
  addDecimalSeparator() { return new Actions.AddDecimalSeparator(); }
  result() { return new Actions.Result(); }
  reset() { return new Actions.Reset(); }
  addOperator(operator: Operator) { return new Actions.AddOperator(operator); }
  addDigit(digit: Digit) { return new Actions.AddDigit(digit); }
}
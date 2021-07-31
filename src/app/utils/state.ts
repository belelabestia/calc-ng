import { Operator, Operators } from "./operators";

interface StateProps {
  readonly partial: string;
  readonly operator: Operator;
  readonly value: string;
  readonly reset: boolean;
}

export class State implements StateProps {
  get partial(): string { return this.props.partial; }
  get operator(): Operator { return this.props.operator; }
  get value(): string { return this.props.value; }
  get reset(): boolean { return this.props.reset; }

  constructor(readonly props: StateProps) { }

  resetIfNeeded(): StateProps {
    return this.props.reset ? State.initial().props : this.props;
  }

  calc(): string {
    return String(this.props.operator.fn(Number(this.props.partial), Number(this.props.value)));
  }

  static initial() {
    return new State({
      partial: "0",
      operator: new Operators.Init(),
      value: "",
      reset: false
    });
  }
}

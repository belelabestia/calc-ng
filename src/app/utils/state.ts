import { Operator } from "./operators";

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

  resetIfNeeded(initial: State): StateProps {
    return this.props.reset ? initial.props : this.props;
  }

  calc(): string {
    return String(this.props.operator.fn(Number(this.props.partial), Number(this.props.value)));
  }
}

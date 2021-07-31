import { Injectable } from "@angular/core";

export interface Operator {
  symbol: string;
  fn(a: number, b: number): number;
}

class Init implements Operator {
  symbol = "";
  fn(_: number, b: number) { return b; }
}

class Add implements Operator {
  symbol = "+";
  fn(a: number, b: number) { return a + b; }
}

class Subtract implements Operator {
  symbol = "-";
  fn(a: number, b: number) { return a - b; }
}

class Multiply implements Operator {
  symbol = "*";
  fn(a: number, b: number) { return a * b; }
}

class Divide implements Operator {
  symbol = "/";
  fn(a: number, b: number) { return a / b; }
}

export const Operators = {
  Init,
  Add,
  Subtract,
  Multiply,
  Divide
}

@Injectable({
  providedIn: 'root'
})
export class OperatorInstances {
  init() { return new Operators.Init(); }
  add() { return new Operators.Add(); }
  subtract() { return new Operators.Subtract(); }
  multiply() { return new Operators.Multiply(); }
  divide() { return new Operators.Divide(); }
}

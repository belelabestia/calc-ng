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

@Injectable({
  providedIn: 'root'
})
export class Operators {
  Init = new Init();
  Add = new Add();
  Subtract = new Subtract();
  Multiply = new Multiply();
  Divide = new Divide();
}

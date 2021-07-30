import { Injectable } from "@angular/core";

export interface SpecialButton {
  name: string,
  symbol: string;
}

class DecimalSeparator implements SpecialButton {
  name = "decimal-separator";
  symbol = ".";
}

class Equals implements SpecialButton {
  name = "equals";
  symbol = "=";
}

class Cancel implements SpecialButton {
  name = "cancel";
  symbol = "C";
}

@Injectable({
  providedIn: 'root'
})
export class SpecialButtons {
  DecimalSeparator = new DecimalSeparator();
  Equals = new Equals();
  Cancel = new Cancel();
}

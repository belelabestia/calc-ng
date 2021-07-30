import { InjectionToken } from "@angular/core";

const digits = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ] as const;
  export type Digits = typeof digits;
  export type Digit = typeof digits[number];
  
  export const DIGITS = new InjectionToken<Digits>('digits', { providedIn: 'root', factory: () => digits });
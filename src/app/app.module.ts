import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { KeysComponent } from './keys/keys.component';
import { OperatorButtonComponent } from './keys/operator-button/operator-button.component';
import { SpecialButtonComponent } from './keys/special-button/special-button.component';
import { DigitButtonComponent } from './keys/digit-button/digit-button.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    KeysComponent,
    OperatorButtonComponent,
    SpecialButtonComponent,
    DigitButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

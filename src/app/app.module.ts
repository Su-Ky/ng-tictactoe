import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';

import {TicTacToeModule} from './components/tictactoe/tictactoe.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TicTacToeModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}


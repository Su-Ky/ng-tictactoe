import {browser, by, element} from 'protractor';

export class AppPage {
  static navigateTo() {
    return browser.get('/') as Promise<any>;
  }

  static getTicTacToe() {
    return element(by.css('app-root app-tictactoe')).getText() as Promise<string>;
  }
}

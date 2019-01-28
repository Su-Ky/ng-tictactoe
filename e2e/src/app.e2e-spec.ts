import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('workspace-project App', () => {

  beforeEach(() => {
  });

  it('should display app tictactoe', () => {
    AppPage.navigateTo();
    expect(AppPage.getTicTacToe()).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});

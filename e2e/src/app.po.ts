import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }
  getParagraphText() {
    return element(by.css('title')).getText();
  }
}

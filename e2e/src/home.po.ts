import { by, element } from 'protractor';

export class HomePage {
    get navBar() {
        return element(by.id('nav-bar'));
    }
    get title() {
        return element(by.id('nav-title')).getText();
    }

    get signOut() {
        return element(by.className('header-logout'));
    }

    trySignOut() {
        this.signOut.click();
    }
}
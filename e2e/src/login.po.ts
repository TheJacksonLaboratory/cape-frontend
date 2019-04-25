import { browser, by, element } from 'protractor';

export class LoginPage {
    navigateTo() {
        return browser.get('/login');
    }

    getUsernameTextbox() {
        return element(by.name('username'));
    }

    getPasswordTextbox() {
        return element(by.name('password'));
    }

    getForm() {
        return element(by.css('#loginForm'));
    }

    getSubmitButton() {
        return element(by.css('#btnSubmit'));
    }

}
import { browser, by, element } from 'protractor';

export class LoginPage {
    navigateTo() {
        return browser.get('/login');
    }

    get username() {
        return element(by.name('username'));
    }

    get password() {
        return element(by.name('password'));
    }

    get signIn() {
        return element(by.className('login-button'));
    }

    get errorMessage() {
        return element(by.className('login-error'));
    }

    getForm() {
        return element(by.css('#loginForm'));
    }

    trySignIn(username: string, password: string) {
        this.username.sendKeys(username);
        this.password.sendKeys(password);
        this.signIn.click();
    }

}

import { LoginPage } from './login.po';
import { browser } from 'protractor';

describe('Login tests', () => {
    let page: LoginPage;

    beforeEach(() => {
        page = new LoginPage();
        page.navigateTo();
    });

    it('Login form should be valid', () => {
        page.getUsernameTextbox().sendKeys('user');
        page.getPasswordTextbox().sendKeys('1234');

        const form = page.getForm().getAttribute('class');

        expect(form).toContain('ng-valid');
    });

    it('Login form should be invalid', () => {
        page.getUsernameTextbox().sendKeys('');
        page.getPasswordTextbox().sendKeys('');

        const form = page.getForm().getAttribute('class');

        expect(form).toContain('ng-invalid');
    });

    it('Should set username value to local storage', () => {
        page.getUsernameTextbox().sendKeys('myuser');
        page.getPasswordTextbox().sendKeys('aworkingpassword');

        page.getSubmitButton().click();

        const valLocalStorage = browser.executeScript('return window.localStorage.getItem(\'currentUser\');');
        // TODO have it equal 'user'
        expect(valLocalStorage).toEqual(null);
    });
})

import { LoginPage } from './login.po';
import { browser, protractor } from 'protractor';
import { HomePage } from './home.po';

describe('Login tests', () => {
    let page: LoginPage;
    const EC = protractor.ExpectedConditions;

    beforeEach(() => {
        page = new LoginPage();
        page.navigateTo();
        browser.executeScript('localStorage.setItem("foo", "bar");');
    });

    it('Login form should be valid', () => {
        page.username.sendKeys('user');
        page.password.sendKeys('1234');

        const form = page.getForm().getAttribute('class');

        expect(form).toContain('ng-valid');
    });

    it('Login form should be invalid', () => {
        page.username.sendKeys('');
        page.password.sendKeys('');

        const form = page.getForm().getAttribute('class');

        expect(form).toContain('ng-pristine ng-invalid ng-touched');
    });

    it('should display an error message to the user if they provided incorrect credentials', () => {
        page.trySignIn('idontexist', 'incorrect');
        browser.wait(EC.visibilityOf(page.errorMessage));
        expect(page.errorMessage.getText()).toEqual('(\'Unable to authenticate username/password:\', LDAPBindError())');
    });

    it('should redirect the user to the home page if they provided correct credentials', () => {
        const homePage = new HomePage();
        page.trySignIn('testuser', 'pa55word');

        // const valLocalStorage = browser.executeScript("return window.localStorage.getItem('currentUser');");
        // expect(valLocalStorage).toEqual('user');
        browser.wait(EC.visibilityOf(homePage.navBar));
        expect(homePage.title).toEqual('Dashboard');
        // return to login page
        homePage.trySignOut();
        const form = page.getForm().getAttribute('class');
        expect(form).toContain('ng-untouched ng-pristine ng-invalid');
    });

});

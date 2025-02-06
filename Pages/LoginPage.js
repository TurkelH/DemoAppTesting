export class LoginPage {

    constructor(page) {
        this.page = page;
        this.userNameInput = '#username';
        this.passwordInput = '#password';
        this.signInButton = '[type="submit"]'
    }

    // Navigate to the URL
    async goToLoginPage(url) {
        await this.page.goto(url)
    }

    // Login 
    async login(username, password) {
        await this.page.locator(this.userNameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.signInButton).click();
    }

}
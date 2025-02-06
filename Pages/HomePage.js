import { expect } from '@playwright/test';

exports.HomePage = class HomePage {


    constructor(page) {
        this.page = page;
        this.WebApplicationButton = '//*[@id="root"]/div/div[1]/nav/button[1]';
        this.WebApplicationPageHeader = '//*[@id="root"]/div/div[2]/header/div/div/h1';
        this.MobileApplicationButton = '//*[@id="root"]/div/div[1]/nav/button[2]';
        this.MobileApplicationPageHeader = '//*[@id="root"]/div/div[2]/header/div/div/h1';
        this.LogOutButton = '//*[@id="root"]/div/div[2]/header/div/button';
    }

    // Navigate to "Web Application" page and validate page header
    async goToWebApplicationPage() {
        await this.page.locator(this.WebApplicationButton).click();
        expect(this.page.locator(this.WebApplicationPageHeader)).toBeVisible;
        await expect(this.page.locator(this.WebApplicationPageHeader)).toHaveAccessibleName('Web Application');
    }

    // Navigate to "Mobile Application" page and validate page header.
    async goToMobileApplicationPage() {
        await this.page.locator(this.MobileApplicationButton).click();
        expect(this.page.locator(this.MobileApplicationPageHeader)).toBeVisible;
        await expect(this.page.locator(this.MobileApplicationPageHeader)).toHaveAccessibleName('Mobile Application');
    }

    // Validate Ticket cloumn and tags.
    async verifyTicketInColumn(columnName, ticketName, tags) {
        const column = await this.page.locator(`h2:has-text("${columnName}")`)
            .locator('..')
            .locator('..');

        const ticket = column.locator(`.flex.flex-col.gap-3 div:has(h3:has-text("${ticketName}"))`);
        await expect(ticket).toBeVisible();

        for (const tag of tags) {
            await expect(ticket.locator(`span:has-text("${tag}")`)).toBeVisible();
        }
    }


    // Click LogOut button
    async clickLogOutButton() {
        await this.page.locator(this.LogOutButton).click();
    }

}


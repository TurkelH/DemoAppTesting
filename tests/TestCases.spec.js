import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { HomePage } from '../Pages/HomePage';
require('dotenv').config();

let login;
let homePage;
const userName = process.env.USERNAME;
const password = process.env.PASSWORD;
const url = process.env.URL;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    login = new LoginPage(page);
    homePage = new HomePage(page);

    // Login
    await login.goToLoginPage(url);
    await login.login(userName, password);
});

test.describe('Web Application Page Test Cases', () => {
    test('Test Case 1 - Verify "Implement user authentication" Ticket in "To Do" Column and tags are "Feature" & "High Priority"', async () => {
        await homePage.verifyTicketInColumn('To Do', 'Implement user authentication', ['Feature', 'High Priority']);
    });

    test('Test Case 2 - Verify "Fix navigation bug" Ticket in "To Do" Column and tag is "Bug"', async () => {
        await homePage.verifyTicketInColumn('To Do', 'Fix navigation bug', ['Bug']);
    });

    test('Test Case 3 - Verify "Design system updates" Ticket in "In Progress" Column and tag is "Design"', async () => {
        await homePage.verifyTicketInColumn('In Progress', 'Design system updates', ['Design']);
    });
});

test.describe('Mobile Application Page Test Cases', () => {
    test.beforeEach(async () => {
        await homePage.goToMobileApplicationPage();
    });

    test('Test Case 4 - Verify "Push notification system" Ticket in "To Do" Column and tag is "Feature"', async () => {
        await homePage.verifyTicketInColumn('To Do', 'Push notification system', ['Feature']);
    });

    test('Test Case 5 - Verify "Offline mode" Ticket in "In Progress" Column and tags are "Feature" & "High Priority"', async () => {
        await homePage.verifyTicketInColumn('In Progress', 'Offline mode', ['Feature', 'High Priority']);
    });

    test('Test Case 6 - Verify "App icon design" Ticket in "Done" Column and tag is "Design"', async () => {
        await homePage.verifyTicketInColumn('Done', 'App icon design', ['Design']);
    });
});

test.afterAll(async () => {
    // LogOut
    await homePage.clickLogOutButton();
});

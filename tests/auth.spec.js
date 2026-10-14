const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { credentials } = require('../pages/credentials');

let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
});

test('Successfully log in with valid credentials', async ({ page }) => {
  await loginPage.login(credentials.username, credentials.password);
  await expect(page).toHaveURL(/.*inventory/);
});

test('Clear username and password fields successfully', async ({ page }) => {
  await loginPage.usernameInput.fill('test-login');
  await loginPage.passwordInput.fill('test-password');
  await loginPage.clearForm();
  await expect(loginPage.usernameInput).toBeEmpty();
  await expect(loginPage.passwordInput).toBeEmpty();
});

test('Display error message when logging in with invalid password', async ({ page }) => {
  await loginPage.login(credentials.wrongUser, credentials.wrongPassword);
  const actualError = await loginPage.getErrorMessageText();
  expect(actualError).toBe(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { credentials } = require('../pages/credentials');

test('Successfully log in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(credentials.username, credentials.password);
});

test('Clear username and password fields successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.usernameInput.fill('test-login');
  await loginPage.passwordInput.fill('test-password');
  await loginPage.clearForm();

  await expect(loginPage.usernameInput).toBeEmpty();
  await expect(loginPage.passwordInput).toBeEmpty();
});

test('Display error message when logging in with invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(credentials.wrongUser, credentials.wrongPassword);
  const actualError = await loginPage.getErrorMessageText();
  expect(actualError).toBe(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

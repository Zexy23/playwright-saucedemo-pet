const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Successfully log in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
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
  await loginPage.login('standard_user', 'wrong_password');
  const actualError = await loginPage.getErrorMessageText();
  expect(actualError).toBe(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

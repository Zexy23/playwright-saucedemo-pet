const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage'); // 1. Подключаем наш чертеж

test('Успешный логин в магазин', async ({ page }) => {
  const loginPage = new LoginPage(page); // 2. Создаем страницу и передаем ей браузер

  // 3. Вызываем метод открытия страницы
  await loginPage.open();

  // 4. Вызываем метод логина и передаем реальные данные
  await loginPage.login('standard_user', 'secret_sauce');
});

test('Очистка формы логина', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.usernameInput.fill('test-login');
  await loginPage.passwordInput.fill('test-password');
  await loginPage.clearForm();

  await expect(loginPage.usernameInput).toBeEmpty();
  await expect(loginPage.passwordInput).toBeEmpty();
});

test('Отображение ошибки при неверном пароле', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'wrong_password');
  const actualError = await loginPage.getErrorMessageText();
  expect(actualError).toBe(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

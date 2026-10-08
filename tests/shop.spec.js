const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');

test('Добавление рюкзака в корзину', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.clearCartIfNotEmpty();
  await productsPage.addBackpackToCart();
  const buttonText = await productsPage.getBackpackButtonText();
  expect(buttonText).toBe('Remove');
  const cartCount = await productsPage.getCartBadgeText();
  expect(cartCount).toBe('1');
});

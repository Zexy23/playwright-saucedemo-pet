const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');

test('Successfully add a backpack to the shopping cart', async ({ page }) => {
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

test('Successfully sort products by price from low to high', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.sortByPriceLowToHigh();
  await expect(productsPage.sortDropdown).toHaveValue('lohi');
});

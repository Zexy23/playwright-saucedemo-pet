const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { credentials } = require('../pages/credentials');

let loginPage;
let productsPage;
let cartPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);
  cartPage = new CartPage(page);
  await loginPage.open();
  await loginPage.login(credentials.username, credentials.password);
});

test('Successfully add a backpack to the shopping cart', async ({ page }) => {
  await productsPage.clearCartIfNotEmpty();
  await productsPage.addBackpackToCart();
  const buttonText = await productsPage.getBackpackButtonText();
  expect(buttonText).toBe('Remove');
  const cartCount = await productsPage.getCartBadgeText();
  expect(cartCount).toBe('1');
});

test('Successfully sort products by price from low to high', async ({ page }) => {
  await productsPage.sortByPriceLowToHigh();
  await expect(productsPage.sortDropdown).toHaveValue('lohi');
});

test('Successfully navigate to checkout screen from cart', async ({ page }) => {
  await productsPage.openCart();
  await cartPage.clickCheckout();
  await expect(page).toHaveURL(/.*checkout-step-one/);
});

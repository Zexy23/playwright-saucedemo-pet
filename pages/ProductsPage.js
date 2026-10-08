class ProductsPage {
  constructor(page) {
    this.page = page;
    this.backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.backpackRemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  }

  async addBackpackToCart() {
    await this.backpackAddToCartButton.click();
  }

  async getBackpackButtonText() {
    return await this.backpackRemoveButton.textContent();
  }

  async getCartBadgeText() {
    return await this.cartBadge.textContent();
  }

  async clearCartIfNotEmpty() {
    const isBadgeVisible = await this.cartBadge.isVisible();
    if (isBadgeVisible === true) {
      await this.backpackRemoveButton.click();
    } else {
      console.log('Корзина пустая');
    }
  }
}

module.exports = { ProductsPage };

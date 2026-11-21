import { test, expect } from '../fixtures/fixtures';
import { checkoutInfo } from '../data/testData';

test('add item to cart', async ({ loggedInInventoryPage, cartPage }) => {
  await loggedInInventoryPage.addToCart('sauce-labs-backpack');
  await expect(loggedInInventoryPage.cartBadge).toHaveText('1');

  await loggedInInventoryPage.openCart();
  await expect(cartPage.title).toHaveText('Your Cart');
  await expect(cartPage.itemNames).toHaveText(['Sauce Labs Backpack']);
});

test('complete checkout', async ({ loggedInInventoryPage, cartPage, checkoutPage }) => {
  await loggedInInventoryPage.addToCart('sauce-labs-backpack');
  await loggedInInventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillInfo(
    checkoutInfo.firstName,
    checkoutInfo.lastName,
    checkoutInfo.postalCode
  );
  await checkoutPage.finish();

  await expect(checkoutPage.completeHeader).toHaveText(
    'Thank you for your order!'
  );
});
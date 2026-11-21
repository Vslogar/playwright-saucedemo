import { test, expect } from '../fixtures/fixtures';
import { users } from '../data/testData';

test('standard user can log in', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(inventoryPage.title).toHaveText('Products');
});

test('login fails with wrong password', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.wrongPassword.username, users.wrongPassword.password);

  await expect(loginPage.errorMessage).toContainText(
    'Username and password do not match'
  );
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
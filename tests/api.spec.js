const { test, expect } = require('@playwright/test');

test('Successfully fetch users list via API', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users?page=2');
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.page).toBe(2);
  expect(body.per_page).toBe(6);
});

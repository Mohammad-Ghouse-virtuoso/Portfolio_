import { test, expect } from '@playwright/test';

test('homepage has title and critical elements', async ({ page }) => {
  await page.goto('/');

  // Check for the hero section text
  await expect(page.getByText('System_Ready')).toBeVisible();

  // Check for the quote ticker
  await expect(page.getByText('ARISE, AWAKE').first()).toBeVisible();

  // Check for projects section
  await expect(page.getByText('Selected Works')).toBeVisible();

  // Check for inspiration section
  await expect(page.getByText('Inspiration')).toBeVisible();
});

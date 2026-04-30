import { test, expect } from "@playwright/test";

test("homepage loads and has title", async ({ page }) => {
  await page.goto("http://localhost:3000"); // assumes Next.js dev server
  await expect(page).toHaveTitle(/AfriCrop AI/);
});

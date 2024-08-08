import { test, expect } from "@playwright/test";

test("it has an input field for logging in", async ({ page }) => {
  await page.goto("/signin", { waitUntil: "networkidle" });
  const emailField = page.getByPlaceholder("E-mail");
  const passwordField = page.getByPlaceholder("Password");
  expect(await emailField.isVisible()).toBe(true);
  expect(await passwordField.isVisible()).toBe(true);
});

test("auth works correctly", async ({ page }) => {
  // Allow all network requests
  page.route("**/*", (route) => route.continue());

  page.on("pageerror", (error) => {
    console.log(`Page error: ${error}`);
  });
  await page.goto("/signin");
  await page.locator('input[placeholder="E-mail"]').fill("demo@demo.com");
  await page.locator('input[placeholder="Password"]').fill("password");
  await page.locator('[data-testid="signin-button"]').click();

  await page.waitForSelector('text="Check your daily tasks and schedule"');

  const isGreetingTextVisible = await page
    .locator('text="Check your daily tasks and schedule"')
    .isVisible();
  expect(isGreetingTextVisible).toBe(true);
});

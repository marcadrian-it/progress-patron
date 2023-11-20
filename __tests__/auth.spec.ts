import { test, expect } from "@playwright/test";

test("it has an input field for logging in", async ({ page }) => {
  await page.goto("/signin");
  const emailField = page.getByPlaceholder("E-mail");
  const passwordField = page.getByPlaceholder("Password");
  expect(emailField).toBeTruthy();
  expect(passwordField).toBeTruthy();
});

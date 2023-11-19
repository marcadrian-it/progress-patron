import { test, expect } from "@playwright/test";

test("it has an input field for logging in", async ({ page }) => {
  await page.goto("/auth/login");
  const emailField = page.getByPlaceholder("E-mail");
  const passwordField = page.getByPlaceholder("Password");
  expect(emailField).toBeTruthy();
  expect(passwordField).toBeTruthy();
});

test("auth works correctly", async ({ page }) => {
  await page.goto("/auth/login");
  const emailField = page.getByPlaceholder("E-mail");
  const passwordField = page.getByPlaceholder("Password");
  await emailField.fill("demo@demo.com");
  await passwordField.fill("password");
  await Promise.all([
    page.click('[data-testid="signin-button"]'),
    page.waitForLoadState("networkidle"),
  ]);

  const urlPath = new URL(page.url()).pathname;

  expect(urlPath).toBe("/home");
});

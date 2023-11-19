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
  await page.getByTestId("signin-button").click();
  await page.waitForTimeout(10000);
  await expect(page).toHaveURL("./home");
  await page.getByLabel("Logout").click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL("./signin");
});

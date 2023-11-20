import { test, expect } from "@playwright/test";

test("it has an input field for logging in", async ({ page }) => {
  await page.goto("/signin", { waitUntil: "networkidle" });
  const emailField = page.getByPlaceholder("E-mail");
  const passwordField = page.getByPlaceholder("Password");
  expect(emailField).toBeTruthy();
  expect(passwordField).toBeTruthy();
});

test("auth works correctly", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("/signin", { waitUntil: "networkidle" });
  const emailField = page.getByPlaceholder("E-mail");
  const passwordField = page.getByPlaceholder("Password");
  await emailField.fill("demo@demo.com");
  await passwordField.fill("password");
  await page.getByTestId("signin-button").click();

  await expect(page).toHaveURL("./home", { timeout: 12000 });
});

import { test, expect } from "@playwright/test";

test.describe("Drumkit E2E Tests", () => {
  test("record → play flow works", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.click("#record");
    await page.keyboard.press("A");
    await page.keyboard.press("S");
    await page.click("#stop");

    const playBtn = page.locator("#play");
    await expect(playBtn).toBeEnabled();

    await playBtn.click();
  });

  test("play button disabled initially", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const playBtn = page.locator("#play");
    await expect(playBtn).toBeDisabled();
  });

  test("play button disabled while recording", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.click("#record");

    const playBtn = page.locator("#play");
    await expect(playBtn).toBeDisabled();
  });

  test("play button enabled after recording", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.click("#record");
    await page.keyboard.press("A");
    await page.click("#stop");

    const playBtn = page.locator("#play");
    await expect(playBtn).toBeEnabled();
  });

  test("invalid keys are ignored", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.click("#record");

    await page.keyboard.press("Q");
    await page.click("#stop");

    const playBtn = page.locator("#play");
    await expect(playBtn).toBeDisabled();
  });

  test("status text updates on key press", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.keyboard.press("A");

    await expect(page.locator("#status")).toHaveText(/A pressed/);
  });

  test("clear button resets recording", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.click("#record");
    await page.keyboard.press("A");
    await page.click("#stop");

    await page.click("#clear");

    const playBtn = page.locator("#play");
    await expect(playBtn).toBeDisabled();
  });

  test("pause and resume recording works", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.click("#record");
    await page.keyboard.press("A");

    await page.click("#pause");
    await page.keyboard.press("S");

    await page.click("#pause");
    await page.keyboard.press("D");

    await page.click("#stop");

    const playBtn = page.locator("#play");
    await expect(playBtn).toBeEnabled();
  });
});

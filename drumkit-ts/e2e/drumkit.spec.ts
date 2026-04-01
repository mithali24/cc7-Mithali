import { test, expect } from "@playwright/test";

test.describe("Drumkit E2E Tests", () => {
  test("record → play flow works", async ({ page }) => {
    await page.goto("/");

    await page.click("#record");
    await page.keyboard.press("A");
    await page.keyboard.press("S");
    await page.click("#stop");

    const playBtn = page.locator("#play");
    await expect(playBtn).toBeEnabled();

    await playBtn.click();
  });

  test("play button disabled initially", async ({ page }) => {
    await page.goto("/");

    const playBtn = page.locator("#play");
    await expect(playBtn).toBeDisabled();
  });

  test("play button disabled while recording", async ({ page }) => {
    await page.goto("/");

    await page.click("#record");

    const playBtn = page.locator("#play");
    await expect(playBtn).toBeDisabled();
  });

  test("play button enabled after recording", async ({ page }) => {
    await page.goto("/");

    await page.click("#record");
    await page.keyboard.press("A");
    await page.click("#stop");

    const playBtn = page.locator("#play");
    await expect(playBtn).toBeEnabled();
  });

  test("invalid keys are ignored", async ({ page }) => {
    await page.goto("/");

    await page.click("#record");

    await page.keyboard.press("Q"); // invalid
    await page.click("#stop");

    const playBtn = page.locator("#play");
    await expect(playBtn).toBeDisabled();
  });

  test("status text updates on record", async ({ page }) => {
    await page.goto("/");

    await page.click("#record");

    await expect(page.locator("#status")).toHaveText("Recording started");
  });

  test("clear button resets recording", async ({ page }) => {
    await page.goto("/");

    await page.click("#record");
    await page.keyboard.press("A");
    await page.click("#stop");

    // ✅ handle confirm dialog
    page.once("dialog", (dialog) => dialog.accept());

    await page.click("#clear");

    const playBtn = page.locator("#play");
    await expect(playBtn).toBeDisabled();
  });

  test("pause and resume recording works", async ({ page }) => {
    await page.goto("/");

    await page.click("#record");
    await page.keyboard.press("A");

    await page.click("#pause");
    await page.keyboard.press("S"); // ignored while paused

    await page.click("#pause"); // resume
    await page.keyboard.press("D");

    await page.click("#stop");

    const playBtn = page.locator("#play");
    await expect(playBtn).toBeEnabled();
  });
});

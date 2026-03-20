import { test, expect } from "@playwright/test";

const APP_URL = "http://127.0.0.1:5173";

test.describe("Post Browser App", () => {
  test("initial load shows first post", async ({ page }) => {
    await page.goto(APP_URL);
    const firstPostTitle = page.locator(".post h2");
    await expect(firstPostTitle).toBeVisible();
    await expect(firstPostTitle).not.toHaveText("");
  });

  test("next button loads next post", async ({ page }) => {
    await page.goto(APP_URL);
    const firstPost = await page.locator(".post h2").textContent();
    await page.click("text=Next");
    const secondPost = await page.locator(".post h2").textContent();
    expect(secondPost).not.toBe(firstPost);
  });

  test("prev button returns to previous post", async ({ page }) => {
    await page.goto(APP_URL);
    const firstPost = await page.locator(".post h2").textContent();
    await page.click("text=Next");
    await page.click("text=Previous");
    const postAgain = await page.locator(".post h2").textContent();
    expect(postAgain).toBe(firstPost);
  });

  test("refresh button reloads first post", async ({ page }) => {
    await page.goto(APP_URL);
    const firstPost = await page.locator(".post h2").textContent();
    await page.click("text=Next");
    await page.click("text=Refresh");
    const refreshedPost = await page.locator(".post h2").textContent();
    expect(refreshedPost).toBe(firstPost);
  });

  test("shows error when posts fail to load", async ({ page }) => {
    await page.route("**/jsonplaceholder.typicode.com/posts**", (route) =>
      route.fulfill({
        status: 500,
        body: "Server Error",
      }),
    );
    await page.goto(APP_URL);
    await expect(page.locator("text=error")).toBeVisible();
  });

  test("should show error message when comments fetch fails", async ({
    page,
  }) => {
    await page.route("**/comments*", (route) =>
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      }),
    );

    await page.goto(APP_URL);

    await expect(page.locator(".post-title")).toBeVisible();

    await page.locator(".view-comments-btn").click();

    const commentsError = page.locator(".comments-error");
    await expect(commentsError).toBeVisible({ timeout: 5000 });
    await expect(commentsError).toContainText(/fail|error/i);
  });
});

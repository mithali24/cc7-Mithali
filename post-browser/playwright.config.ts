import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "html",
  // Increase global timeout for WSL stability
  timeout: 30000,
  expect: {
    timeout: 10000, // Wait up to 10s for the word "error" to appear
  },
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "on",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev -- --host",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});

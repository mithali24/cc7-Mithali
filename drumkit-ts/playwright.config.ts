import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",

  use: {
    browserName: "chromium",
    baseURL: "http://localhost:5173",
  },

  webServer: {
    command: "npm run dev -- --host",
    url: "http://localhost:5173",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});

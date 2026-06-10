import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3001",
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.2,
    },
  },
  webServer: {
    command: "npm run build && npx serve examples/dist -l 3001",
    url: "http://localhost:3001",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

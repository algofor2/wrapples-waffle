import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: { baseURL: 'http://127.0.0.1:3001', browserName: 'chromium', launchOptions: { executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }, trace: 'retain-on-failure' },
  projects: [{ name: 'desktop', use: { viewport: { width: 1440, height: 900 } } }, { name: 'mobile', use: { ...devices['iPhone 13'], browserName: 'chromium', launchOptions: { executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' } } }],
  webServer: { command: 'npm run start -- -p 3001', url: 'http://127.0.0.1:3001', reuseExistingServer: false, timeout: 120000 },
});

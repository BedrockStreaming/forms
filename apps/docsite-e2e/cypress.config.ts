import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import setupNodeEvents from './src/plugins/index';

const cypressJsonConfig = {
  baseUrl: 'http://localhost:3000',
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  video: false,
  videosFolder: '../../dist/cypress/apps/docsite-e2e/videos',
  screenshotsFolder: '../../dist/cypress/apps/docsite-e2e/screenshots',
  chromeWebSecurity: false,
  specPattern: 'src/e2e/**/*.feature',
  supportFile: 'src/support/e2e.ts',
};

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    ...cypressJsonConfig,
    setupNodeEvents,
  },
});

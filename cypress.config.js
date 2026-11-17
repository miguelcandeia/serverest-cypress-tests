const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportFilename: 'index',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    env: { apiUrl: 'https://serverest.dev' },
    video: false,
    defaultCommandTimeout: 8000,
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
})

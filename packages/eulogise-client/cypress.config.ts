import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '4j64i6',
  viewportHeight: 720,
  viewportWidth: 1080,
  defaultCommandTimeout: 10000, // 10 seconds
  pageLoadTimeout: 60000, // 60 seconds
  e2e: {
    baseUrl: 'http://localhost:8080',
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.e2e.spec.*',
  },
})

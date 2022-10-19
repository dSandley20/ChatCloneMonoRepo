const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 945,
  viewportWidth: 1751,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

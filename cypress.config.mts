import { defineConfig } from "cypress"
import { config as loadEnv } from "dotenv"
loadEnv()

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // plugins code (must be ESM)
    },
  },
  env: {
    BASE_URL: process.env.BASE_URL
  },
})

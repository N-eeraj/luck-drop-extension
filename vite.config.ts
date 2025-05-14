import {
  defineConfig,
  loadEnv,
} from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"
import ViteVueRemoveAttributesPlugin from "@n-eeraj/vite-plugins/ViteVueRemoveAttributesPlugin"
import ViteRemoveConsolePlugin from "@n-eeraj/vite-plugins/ViteRemoveConsolePlugin"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      tailwindcss(),
      ViteVueRemoveAttributesPlugin([
        "data-cy",
      ], {
        enabled: env.VITE_ENV === "PRODUCTION",
      }),
      ViteRemoveConsolePlugin({
        enabled: env.VITE_ENV === "PRODUCTION",
      })
    ],
  }
})

import {
  reactive,
  provide,
  inject,
} from "vue"
import { View } from "../types.ts"

const defaultApp = {
  view: View.Menu,
}

const AppContextKey = Symbol("appContext")

export function useAppProvider() {
  const app = reactive(defaultApp)

  function setView(view: View) {
    app.view = view
  }

  provide(AppContextKey, {
    app,
    setView,
  })
  return app
}

export default function useApp() {
  const appContext = inject<typeof defaultApp>(AppContextKey)

  if (!appContext) {
    throw new Error("Must be used within a provider")
  }

  return appContext
}

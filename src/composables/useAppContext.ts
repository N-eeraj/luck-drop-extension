import { reactive } from "vue"
import useContext from "@n-eeraj/use-composables/useContext"
import { View } from "../types.ts"

const key = Symbol()
const preference = JSON.parse(localStorage.getItem("preference") ?? "{}")

export default function useAppContext() {
  const app = reactive({
    view: View.Menu,
    sound: preference.sound ?? true,
    darkMode: preference.darkMode ?? false,
  })

  function setView(view: View) {
    app.view = view
  }

  const context = useContext(key, {
    app,
    setView,
  })

  return context
}

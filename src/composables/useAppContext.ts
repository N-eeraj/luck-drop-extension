import {
  reactive,
  watch,
} from "vue"
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

  watch( () => app.darkMode, () => document.documentElement.classList.toggle("dark"))

  const context = useContext(key, {
    app,
    setView,
  })

  return context
}

import { reactive } from "vue"
import { View } from "../types.ts"
import useContext from "./useContext.ts"

const key = Symbol()

export default function useAppContext() {
  const app = reactive({
    view: View.Menu,
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

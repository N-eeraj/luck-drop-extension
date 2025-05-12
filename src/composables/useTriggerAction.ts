import {
  ref,
  type Ref,
} from "vue"
import useAppContext from "./useAppContext"

export default function useTriggerAction(trigger: Function, isInitialTrigger: Ref<boolean>, audio: string) {
  const { app } = useAppContext()

  const isAnimating = ref(false)
  const loading = ref(false)
  const sfx = new Audio(audio)

  const triggerAction = () => {
    loading.value = true
    isAnimating.value = true
    const animationTime = isInitialTrigger.value ? 1000 : 2000
    if (app.sound) {
      setTimeout(() => {
        sfx.play()
      }, animationTime - 1000)
    }
    setTimeout(() => {
      trigger()
      isAnimating.value = false
      setTimeout(() =>  loading.value = false, animationTime)
    }, animationTime)
  }

  return {
    isAnimating,
    loading,
    triggerAction,
  }
}

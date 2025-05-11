<script setup lang="ts">
import {
  computed,
  onMounted,
} from "vue"
import Menu from "./components/Views/Menu.vue"
import CoinFlip from "./components/Views/CoinFlip.vue"
import DiceRoll from "./components/Views/DiceRoll.vue"
import Settings from "./components/Views/Settings.vue"

import useAppContext from "./composables/useAppContext.ts"
import { View } from "./types.ts"

const { app } = useAppContext()

const AppView = computed(() => {
  switch(app.view) {
    case View.Menu:
      return Menu
    case View.CoinFlip:
      return CoinFlip
    case View.DiceRoll:
      return DiceRoll
    case View.Settings:
      return Settings
  }
})

onMounted(() => app.darkMode && document.documentElement.classList.add("dark"))
</script>

<template>
  <main class="relative flex flex-col w-fit min-w-48 min-h-48 p-4 bg-background text-foreground">
    <component
      :is="AppView"
      class="flex-1" />
  </main>
</template>

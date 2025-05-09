<script setup lang="ts">
import Menu from "./components/Menu.vue"
import CoinFlip from "./components/CoinFlip/index.vue"
import DiceRoll from "./components/DiceRoll/index.vue"

import useAppContext from "./composables/useAppContext.ts"
import { View } from "./types.ts"

const { app } = useAppContext()
</script>

<template>
  <main class="relative w-fit min-h-48 min-w-48 p-4 bg-background text-foreground">
    <Menu v-if="app.view === View.Menu" />
    <CoinFlip v-else-if="app.view === View.CoinFlip" />
    <DiceRoll v-else-if="app.view === View.DiceRoll" />
  </main>
</template>
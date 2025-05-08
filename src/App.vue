<script setup lang="ts">
import { ref } from "vue"
import Menu from "./components/Menu.vue"
import CoinFlip from "./components/CoinFlip/index.vue"
import DiceRoll from "./components/DiceRoll/index.vue"
import { View } from "./types.ts"

const view = ref(View.Menu)

function handleViewChange(v: View) {
  view.value = v
}
</script>

<template>
  <main class="w-fit min-h-48 min-w-48 p-4 bg-background text-foreground">
    <Menu
      v-if="view === View.Menu"
      @menu-selection="handleViewChange" />
    <CoinFlip
      v-else-if="view === View.CoinFlip"
      @home="handleViewChange(View.Menu)" />
    <DiceRoll
      v-else-if="view === View.DiceRoll"
      @home="handleViewChange(View.Menu)" />
  </main>
</template>
<script setup lang="ts">
import Button from "./Base/Button.vue"
import { View } from "../types.ts"

const emit = defineEmits([
  "menu-selection",
])
</script>

<template>
  <div class="flex justify-center items-center flex-col gap-y-6">
    <h1 class="text-primary text-2xl font-semibold">
      Luck Drop
    </h1>

    <ul class="w-full px-4 space-y-3">
      <li>
        <Button
          class="w-full"
          @click="emit('menu-selection', View.CoinFlip)">
          Coin Flip
        </Button>
      </li>
      <li>
        <Button
          class="w-full"
          @click="emit('menu-selection', View.DiceRoll)">
          Dice Roll
        </Button>
      </li>
    </ul>
  </div>
</template>
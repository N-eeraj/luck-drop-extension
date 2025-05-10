<script setup lang="ts">
import Button from "../Base/Button.vue"
import useAppContext from "../../composables/useAppContext.ts"
import { View } from "../../types.ts"

const { setView } = useAppContext()

const menuOptions = [
  {
    label: "Coin Flip",
    value: View.CoinFlip,
  },
  {
    label: "Dice Roll",
    value: View.DiceRoll,
  },
  {
    label: "Settings",
    value: View.Settings,
  },
] as const
</script>

<template>
  <div class="flex justify-center items-center flex-col gap-y-6">
    <h1 class="text-foreground text-2xl font-semibold">
      Luck Drop
    </h1>

    <ul class="w-full px-4 space-y-3">
      <li
        v-for="({ label, value }) in menuOptions"
        :key="value">
        <Button
          class="w-full"
          @click="setView(value)">
          {{ label }}
        </Button>
      </li>
    </ul>
  </div>
</template>
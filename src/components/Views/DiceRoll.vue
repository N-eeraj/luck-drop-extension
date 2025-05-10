<script setup lang="ts">
import { ref } from "vue"
import RandomNumber from "@n-eeraj/random/RandomNumber"

import Home from "../Home.vue"
import Button from "../Base/Button.vue"

const diceFace = ref<number | null>(null)
const loading = ref(false)

function rollDice() {
  loading.value = true
  setTimeout(() => {
    diceFace.value = RandomNumber.int({
      min: 1,
      max: 6,
    })
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="flex flex-col h-full">
    <h1 class="text-xl font-medium">
      Dice Roll
    </h1>
    <Home />

    <div v-if="loading">
      Rolling...
    </div>

    <template v-else-if="diceFace !== null">
      {{ diceFace }}
    </template>

    <Button
      class="w-full mt-auto"
      :disabled="loading"
      @click="rollDice">
      Roll
    </Button>
  </div>
</template>
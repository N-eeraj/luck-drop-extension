<script setup lang="ts">
import { ref } from "vue"
import RandomNumber from "@n-eeraj/random/RandomNumber"

import Home from "../Home.vue"
import Button from "../Base/Button.vue"

const emit = defineEmits([
  "home",
])

const diceFace = ref(null)
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
  <div>
    <h1 class="text-xl font-medium">
      Dice Roll
    </h1>
    <Home @click="emit('home')" />

    <div v-if="loading">
      Rolling...
    </div>

    <template v-else-if="diceFace !== null">
      {{ diceFace }}
    </template>

    <Button
      class="w-full"
      :disabled="loading"
      @click="rollDice">
      Roll
    </Button>
  </div>
</template>
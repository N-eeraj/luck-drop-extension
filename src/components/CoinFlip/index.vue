<script setup lang="ts">
import { ref } from "vue"
import { randomBoolean } from "@n-eeraj/random"

import Home from "../Home.vue"
import Button from "../Base/Button.vue"

const emit = defineEmits([
  "home",
])

const coinFace = ref(null)
const loading = ref(false)

function flipCoin() {
  loading.value = true
  setTimeout(() => {
    coinFace.value = randomBoolean()
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div>
    <h1 class="text-xl font-medium">
      Coin Flip
    </h1>
    <Home @click="emit('home')" />

    <div v-if="loading">
      Coin in the air...
    </div>

    <template v-else-if="coinFace !== null">
      {{ coinFace ? "Head" : "Tail" }}
    </template>

    <Button
      class="w-full"
      :disabled="loading"
      @click="flipCoin">
      Flip
    </Button>
  </div>
</template>
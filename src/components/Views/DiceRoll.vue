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
  }, diceFace.value === null ? 1000 : 2000)
}
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <h1 class="text-xl font-medium">
      Dice Roll
    </h1>
    <Home />

    <div class="flex-1 overflow-x-hidden">
      <Transition mode="out-in">
        <img
          v-if="loading"
          src="/animations/die-roll.gif"
          alt="dice roll animation"
          class="w-20 m-auto" />
        <span v-else-if="diceFace !== null">
          {{ diceFace }}
        </span>
      </Transition>
    </div>

    <Button
      class="w-full"
      :disabled="loading"
      @click="rollDice">
      Roll
    </Button>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  @apply ease-linear duration-1000;
}

.v-enter-from {
  @apply -translate-x-[200%];
}
.v-leave-to {
  @apply translate-x-[200%];
}
</style>

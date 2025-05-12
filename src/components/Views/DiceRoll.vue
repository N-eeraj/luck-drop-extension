<script setup lang="ts">
import { ref } from "vue"
import RandomNumber from "@n-eeraj/random/RandomNumber"

import Home from "../Home.vue"
import Button from "../Base/Button.vue"
import useAppContext from "../../composables/useAppContext"

const { app } = useAppContext()

const diceFace = ref<number | null>(null)
const isAnimating = ref(false)
const loading = ref(false)

const sfx = new Audio("/sfx/dice.mp3")

function rollDice() {
  loading.value = true
  isAnimating.value = true
  const animationTime = diceFace.value === null ? 1000 : 2000
  if (app.sound) {
    setTimeout(() => {
      sfx.play()
    }, animationTime - 1000)
  }
  setTimeout(() => {
    diceFace.value = RandomNumber.int({
      min: 1,
      max: 6,
    })
    isAnimating.value = false
    setTimeout(() =>  loading.value = false, animationTime)
  }, animationTime)
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
          v-if="isAnimating"
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

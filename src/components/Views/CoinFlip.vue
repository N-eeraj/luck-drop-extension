<script setup lang="ts">
import { ref } from "vue"
import { randomBoolean } from "@n-eeraj/random"

import Home from "../Home.vue"
import Button from "../Base/Button.vue"
import useAppContext from "../../composables/useAppContext"

const { app } = useAppContext()

const coinFace = ref<boolean | null>(null)
const loading = ref(false)
const isAnimating = ref(false)

const sfx = new Audio("/sfx/coin.mp3")

function flipCoin() {
  loading.value = true
  isAnimating.value = true
  const animationTime = coinFace.value === null ? 1000 : 2000
  if (app.sound) {
    setTimeout(() => {
      sfx.play()
    }, animationTime - 1000)
  }
  setTimeout(() => {
    coinFace.value = randomBoolean()
    isAnimating.value = false
    setTimeout(() =>  loading.value = false, animationTime)
  }, animationTime)
}
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <h1 class="text-xl font-medium">
      Coin Flip
    </h1>
    <Home />

    <div class="flex-1 overflow-y-hidden">
      <Transition mode="out-in">
        <img
          v-if="isAnimating"
          src="/animations/coin-flip.gif"
          alt="coin flip animation"
          class="w-20 m-auto -translate-y-full" />
        <span v-else-if="coinFace !== null">
          {{ coinFace ? "Head" : "Tail" }}
        </span>
      </Transition>
    </div>

    <Button
      class="w-full"
      :disabled="loading"
      @click="flipCoin">
      Flip
    </Button>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  @apply ease-linear duration-1000;
}

.v-enter-from, .v-leave-to {
  @apply translate-y-full;
}
</style>

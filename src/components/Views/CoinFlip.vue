<script setup lang="ts">
import {
  ref,
  computed,
} from "vue"
import { randomBoolean } from "@n-eeraj/random"

import Home from "../Home.vue"
import Button from "../Base/Button.vue"
import useAppContext from "../../composables/useAppContext"

const { app } = useAppContext()

const coinFace = ref<boolean | null>(null)
const isAnimating = ref(false)
const loading = ref(false)
const sfx = new Audio("/sfx/coin.mp3")

const coinFaceText = computed(() => coinFace.value ? "head" : "tail")

function triggerAction() {
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
  <section
    class="flex flex-col gap-y-2"
    data-cy="coin-flip-view">
    <h1 class="text-xl font-medium">
      Coin Flip
    </h1>
    <Home />

    <div class="grid place-content-center flex-1 overflow-y-hidden">
      <Transition mode="out-in">
        <img
          v-if="isAnimating"
          src="/animations/coin-flip.gif"
          alt="coin flip animation"
          class="w-20 -translate-y-full" />
        <div
          v-else-if="coinFace !== null"
          class="flex flex-col items-center gap-y-1">
          <img
            :src="`/images/coin-face/${coinFaceText}.webp`"
            :alt="coinFaceText"
            class="w-12 m-auto" />
          <span class="capitalize">
            {{ coinFaceText }}
          </span>
        </div>
      </Transition>
    </div>

    <Button
      class="w-full"
      :disabled="loading"
      @click="triggerAction">
      Flip
    </Button>
  </section>
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

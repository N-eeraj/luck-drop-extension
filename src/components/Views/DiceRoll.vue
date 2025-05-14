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

function triggerAction() {
  loading.value = true
  isAnimating.value = true
  if (app.sound) {
    sfx.play()
  }
  setTimeout(() => {
    diceFace.value = RandomNumber.int({
      min: 1,
      max: 6,
    })
    isAnimating.value = false
    setTimeout(() =>  loading.value = false, 1000)
  }, 1000)
}
</script>

<template>
  <section
    class="flex flex-col gap-y-2"
    data-cy="die-roll-view">
    <h1 class="text-xl font-medium">
      Dice Roll
    </h1>
    <Home />

    <div class="relative grid place-content-center flex-1 overflow-y-hidden">
      <Transition name="animation">
        <img
          v-if="isAnimating"
          src="/animations/die-roll.gif"
          alt="dice roll animation"
          class="w-20 m-auto" />
      </Transition>
      <Transition name="view">
        <img
          v-if="!loading && diceFace !== null"
          :src="`/images/dice/${diceFace}.svg`"
          :alt="`dice-face-${diceFace}`"
          class="size-16" />
      </Transition>
    </div>

    <Button
      class="w-full"
      :disabled="loading"
      @click="triggerAction">
      Roll
    </Button>
  </section>
</template>

<style scoped>
.animation-enter-active,
.animation-leave-active {
  @apply ease-linear duration-1000;
}

.animation-enter-from {
  @apply -translate-x-[200%];
}
.animation-leave-to {
  @apply translate-x-[200%];
}

.view-enter-active {
  @apply transition-opacity duration-1000;
}
.view-leave-active {
  @apply transition-opacity duration-0;
}

.view-enter-from, .view-leave-to {
  @apply opacity-0;
}
</style>

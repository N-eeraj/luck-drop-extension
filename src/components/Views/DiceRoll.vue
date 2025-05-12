<script setup lang="ts">
import {
  ref,
  computed,
} from "vue"
import RandomNumber from "@n-eeraj/random/RandomNumber"

import Home from "../Home.vue"
import Button from "../Base/Button.vue"
import useTriggerAction from "../../composables/useTriggerAction"

const diceFace = ref<number | null>(null)
  const isInitialTrigger = computed(() => diceFace.value === null)

const {
  loading,
  isAnimating,
  triggerAction,
} = useTriggerAction(() => {
  diceFace.value = RandomNumber.int({
    min: 1,
    max: 6,
  })
}, isInitialTrigger, "/sfx/dice.mp3")
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
      @click="triggerAction">
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

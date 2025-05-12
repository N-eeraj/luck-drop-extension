<script setup lang="ts">
import {
  ref,
  computed,
} from "vue"
import { randomBoolean } from "@n-eeraj/random"

import Home from "../Home.vue"
import Button from "../Base/Button.vue"
import useTriggerAction from "../../composables/useTriggerAction"

const coinFace = ref<boolean | null>(null)
const isInitialTrigger = computed(() => coinFace.value === null)

const {
  loading,
  isAnimating,
  triggerAction,
} = useTriggerAction(() =>  coinFace.value = randomBoolean(), isInitialTrigger, "/sfx/coin.mp3")
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
      @click="triggerAction">
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

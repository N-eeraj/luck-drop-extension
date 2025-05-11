<script setup lang="ts">
import useAppContext from "../composables/useAppContext.ts"
import { View } from '../types'

const {
  app,
  setView,
} = useAppContext()
</script>

<template>
  <button
    class="group absolute top-2 right-2 p-1 hover:bg-foreground/20 cursor-pointer rounded duration-200"
    @click="setView(View.Menu)">
    <img
      :src="`/icons/home/${app.darkMode ? 'dark' : 'light'}.svg`"
      alt="home"
      class="size-6 group-hover:scale-90 duration-300" />
  </button>
</template>
<script setup lang="ts">
import { watch } from "vue"
import Home from "../Home.vue"
import Switch from "../Base/Switch.vue"
import useAppContext from "../../composables/useAppContext"

const { app } = useAppContext()

watch(
  () => app,
  ({ sound, darkMode }) => {
    localStorage.setItem("preference", JSON.stringify({ sound, darkMode }))
  },
  { deep: true }
)
</script>

<template>
  <section
    class="flex flex-col h-full"
    data-cy="settings-view">
    <h1 class="text-xl font-medium">
      Settings
    </h1>
    <Home />
    <ul class="flex flex-col gap-y-3 mt-3">
      <li class="flex justify-between items-center">
        <span>
          Dark Mode
        </span>
        <Switch v-model="app.darkMode" />
      </li>
      <li class="flex justify-between items-center">
        <span>
          Sound
        </span>
        <Switch v-model="app.sound" />
      </li>
    </ul>
  </section>
</template>

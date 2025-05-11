<script setup lang="ts">
const value = defineModel()
</script>

<template>
  <label
    class="relative inline-block aspect-[2] h-7 bg-foreground rounded-full cursor-pointer after:absolute after:top-1/2 after:h-full after:aspect-square after:bg-white after:rounded-full after:-translate-y-1/2 after:scale-80 after:duration-200"
    :class="value ? 'after:left-full after:-translate-x-full' : 'after:left-0 grayscale'">
    <input
      v-model="value"
      type="checkbox"
      class="hidden" />
  </label>
</template>
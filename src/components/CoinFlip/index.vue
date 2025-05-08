<script setup lang="ts">
const emit = defineEmits([
  "home",
])
</script>

<template>
  <div>
    <h1>
      Coin Flip
    </h1>
    <button @click="emit('home')">
      Home
    </button>
  </div>
</template>
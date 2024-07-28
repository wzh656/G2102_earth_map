<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <Transition name="pageSwitch">
    <RouterView />
  </Transition>
</template>

<style>
.pageSwitch-enter-active,
.pageSwitch-leave-active {
  transition: opacity 1s ease;
}

.pageSwitch-enter-from,
.pageSwitch-leave-to {
  opacity: 0;
}
</style>

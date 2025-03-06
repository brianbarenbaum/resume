<script setup lang="ts">
import AppNav from './components/AppNav.vue'
</script>

<template>
  <div class="flex flex-col h-screen">
    <AppNav />
    <div class="flex-1 overflow-hidden">
      <router-view />
    </div>
  </div>
</template>

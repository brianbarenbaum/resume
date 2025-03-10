<script setup lang="ts">
defineProps<{
  name: string
  size?: string
  className?: string
}>()
</script>

<template>
  <svg :class="className" :width="size" :height="size">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

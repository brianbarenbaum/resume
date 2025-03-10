<script setup lang="ts">
import { useMobileMenuStore } from '../composables/mobileMenuStore'
const { closeMenu } = useMobileMenuStore()
</script>

<template>
  <router-link
    to="/"
    @click="closeMenu"
    active-class="text-primary dark:text-primary-light"
    class="block py-3 px-4 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
  >
    Resume Chat
  </router-link>

  <router-link
    to="/resume"
    @click="closeMenu"
    active-class="text-primary dark:text-primary-light"
    class="dark:border-gray-700 block py-3 px-4 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-gray-200"
  >
    Full Resume
  </router-link>
</template>

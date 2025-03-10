<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import Icon from './AppIcon.vue'
import { useMobileMenuStore } from '../composables/mobileMenuStore'
const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenuStore()

defineProps<{
  logoIconName: string
}>()
</script>

<template>
  <div class="md:hidden flex">
    <AppIcon :name="logoIconName" className="h-7 w-20" />
    <button
      @click="toggleMobileMenu"
      type="button"
      class="text-gray-500 mt-1 dark:text-gray-200 hover:text-gray-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      aria-controls="mobile-menu"
      aria-expanded="false"
    >
      <span class="sr-only">Open main menu</span>
      <!-- Icon when menu is closed -->
      <Icon v-if="!isMobileMenuOpen" name="menu" size="24" className="h-6 w-6" />
      <!-- Icon when menu is open -->
      <Icon v-else name="close" size="24" className="h-6 w-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
import AppNavThemeButtons from './AppNavThemeButtons.vue'
import AppNavMobileBurger from './AppNavMobileBurger.vue'
import AppNavRouterLinksDesktop from './AppNavRouterLinksDesktop.vue'
import AppNavRouterLinksMobile from './AppNavRouterLinksMobile.vue'
import { useMobileMenuStore } from '../composables/mobileMenuStore'
const { isMobileMenuOpen, closeMenu } = useMobileMenuStore()
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md w-full">
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Desktop and Mobile Header Bar -->
      <div class="flex items-center justify-between h-9 md:h-16">
        <!-- Desktop Navigation and Theme Toggle (hidden on mobile) -->
        <div class="hidden md:flex w-full items-center justify-between space-x-8">
          <!-- Desktop Navigation Links -->
          <AppNavRouterLinksDesktop />

          <!-- Desktop Theme Toggle -->
          <div class="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <AppNavThemeButtons />
          </div>
        </div>

        <!-- Mobile Burger Menu Button -->
        <AppNavMobileBurger />
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      id="mobile-menu"
      :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
      class="md:hidden"
    >
      <div class="space-y-2 border-t border-gray-200 dark:border-gray-700">
        <!-- Mobile Navigation Links -->
        <AppNavRouterLinksMobile />
      </div>

      <!-- Mobile Theme Toggle -->
      <div class="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-left">
          <div class="inline-flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <AppNavThemeButtons />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#mobile-menu {
  transition: all 0.3s ease;
}
</style>

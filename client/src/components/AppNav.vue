<script setup lang="ts">
import AppNavThemeButtons from './AppNavThemeButtons.vue'
import AppNavMobileBurger from './AppNavMobileBurger.vue'
import AppNavRouterLinksDesktop from './AppNavRouterLinksDesktop.vue'
import AppNavRouterLinksMobile from './AppNavRouterLinksMobile.vue'
import AppIcon from './AppIcon.vue'
import { useMobileMenuStore } from '../composables/mobileMenuStore'
import { useThemeStore } from '../composables/themeStore'
import { computed } from 'vue'

const { isMobileMenuOpen } = useMobileMenuStore()
const { currentTheme } = useThemeStore()

const logoIconName = computed(() => {
  if (currentTheme.value === 'dark') return 'logo-dark'
  return 'logo-light'
})
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md w-full">
    <div class="w-full mx-auto px-2 sm:px-3 lg:px-4">
      <!-- Desktop and Mobile Header Bar -->
      <div class="flex items-center justify-between h-9 md:h-16">
        <!-- Desktop Navigation and Theme Toggle (hidden on mobile) -->
        <div class="hidden md:flex w-full items-center justify-between space-x-8">
          <!-- BB logo -->
          <AppIcon :name="logoIconName" className="h-14 w-32" />

          <!-- Desktop Navigation Links -->
          <div class="flex-1">
            <AppNavRouterLinksDesktop />
          </div>

          <!-- Desktop Theme Toggle -->
          <div class="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <AppNavThemeButtons />
          </div>
        </div>

        <!-- Mobile Burger Menu Button -->
        <AppNavMobileBurger :logoIconName="logoIconName" />
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

<script setup lang="ts">
import { useThemeStore } from '../composables/themeStore'
import { ref } from 'vue'

const { currentTheme, applyTheme } = useThemeStore()

// Mobile menu state
const isMobileMenuOpen = ref(false)

// Toggle mobile menu
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu when clicking a link
function closeMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md w-full">
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Desktop and Mobile Header Bar -->
      <div class="flex items-center justify-between h-9 md:h-16">
        <!-- Desktop Navigation and Theme Toggle (hidden on mobile) -->
        <div class="hidden md:flex w-full items-center justify-between space-x-8">
          <!-- Desktop Navigation Links -->
          <div class="flex items-center space-x-6">
            <router-link
              to="/"
              active-class="text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light"
              class="text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors pb-1"
            >
              Resume Chat
            </router-link>
            <router-link
              to="/resume"
              active-class="text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light"
              class="flex-1text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors pb-1"
            >
              Full Resume
            </router-link>
          </div>

          <!-- Desktop Theme Toggle -->
          <div class="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <!-- Light mode button -->
            <button
              @click="applyTheme('light')"
              :class="[
                'p-2 rounded transition-colors duration-200 cursor-pointer',
                currentTheme === 'light'
                  ? 'bg-white dark:bg-gray-600 shadow-sm text-yellow-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-yellow-500',
              ]"
              aria-label="Light mode"
              title="Switch to light mode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </button>

            <!-- System theme button -->
            <button
              @click="applyTheme('system')"
              :class="[
                'p-2 rounded transition-colors duration-200 cursor-pointer',
                currentTheme === 'system'
                  ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-blue-500',
              ]"
              aria-label="System theme"
              title="Switch to system theme"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>

            <!-- Dark mode button -->
            <button
              @click="applyTheme('dark')"
              :class="[
                'p-2 rounded transition-colors duration-200 cursor-pointer',
                currentTheme === 'dark'
                  ? 'bg-white dark:bg-gray-600 shadow-sm text-indigo-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-indigo-500',
              ]"
              aria-label="Dark mode"
              title="Switch to dark mode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Burger Menu Button (hidden on desktop) -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            type="button"
            class="text-gray-500 mt-1 dark:text-gray-200 hover:text-gray-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed -->
            <svg
              class="h-6 w-6"
              :class="{ hidden: isMobileMenuOpen, block: !isMobileMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Icon when menu is open -->
            <svg
              class="h-6 w-6"
              :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu (collapsible) -->
    <div
      id="mobile-menu"
      :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
      class="md:hidden"
    >
      <div class="space-y-2 border-t border-gray-200 dark:border-gray-700">
        <!-- Mobile Navigation Links -->
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
      </div>

      <!-- Mobile Theme Toggle -->
      <div class="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-left">
          <div class="inline-flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <!-- Light mode button (same as desktop) -->
            <button
              @click="applyTheme('light')"
              :class="[
                'p-2 rounded transition-colors duration-200 cursor-pointer',
                currentTheme === 'light'
                  ? 'bg-white dark:bg-gray-600 shadow-sm text-yellow-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-yellow-500',
              ]"
              aria-label="Light mode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </button>

            <!-- System theme button (same as desktop) -->
            <button
              @click="applyTheme('system')"
              :class="[
                'p-2 rounded transition-colors duration-200 cursor-pointer',
                currentTheme === 'system'
                  ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-blue-500',
              ]"
              aria-label="System theme"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>

            <!-- Dark mode button (same as desktop) -->
            <button
              @click="applyTheme('dark')"
              :class="[
                'p-2 rounded transition-colors duration-200 cursor-pointer',
                currentTheme === 'dark'
                  ? 'bg-white dark:bg-gray-600 shadow-sm text-indigo-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-indigo-500',
              ]"
              aria-label="Dark mode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
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

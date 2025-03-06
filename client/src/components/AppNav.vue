<script setup lang="ts">
import { useThemeStore } from '../composables/themeStore'

const { currentTheme, applyTheme } = useThemeStore()
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md w-full">
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- App Title - Left Side -->
        <div class="flex items-center space-x-6">
          <!-- App Title as link to ChatView -->
          <router-link
            to="/"
            active-class="text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light"
            class="text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors pb-1"
          >
            Resume Bot
          </router-link>

          <!-- Link to ResumeView -->
          <router-link
            to="/resume"
            active-class="text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light"
            class="text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors pb-1"
          >
            Full Resume
          </router-link>
        </div>

        <!-- Theme Toggle - Right Side with Margin -->
        <div class="flex items-center mr-4">
          <!-- Theme toggle controls -->
          <div class="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <!-- Light mode -->
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

            <!-- System theme -->
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

            <!-- Dark mode -->
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
      </div>
    </div>
  </nav>
</template>

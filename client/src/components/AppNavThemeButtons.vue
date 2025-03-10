<script setup lang="ts">
import { useThemeStore } from '../composables/themeStore'
import Icon from './AppIcon.vue'

const { currentTheme, applyTheme } = useThemeStore()
</script>

<template>
  <div>
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
      <Icon name="light-mode" size="20" className="h-5 w-5" />
    </button>

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
      <Icon name="system-theme" size="20" className="h-5 w-5" />
    </button>

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
      <Icon name="dark-mode" size="20" className="h-5 w-5" />
    </button>
  </div>
</template>

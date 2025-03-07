<script setup lang="ts">
import { useChatStore } from '../composables/chatStore'
const { userInput, loading, sendMessage } = useChatStore()
</script>

<template>
  <div
    class="flex flex-col md:flex-row gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0"
  >
    <input
      v-model="userInput"
      @keyup.enter="sendMessage"
      placeholder="Ask a question about my resume..."
      :disabled="loading"
      class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full outline-none focus:border-primary bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
    />

    <button
      @click="sendMessage"
      :disabled="loading || !userInput.trim()"
      aria-label="Send message"
      class="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-gray-800 disabled:bg-gray-200 dark:disabled:bg-gray-700 dark:bg-gray-600 hover:bg-gray-700 dark:hover:bg-gray-600 disabled:text-gray-100 text-white dark:text-gray-200 dark:disabled:text-gray-600 cursor-pointer rounded-full transition-colors disabled:cursor-not-allowed self-end md:self-center"
    >
      <!-- Up Arrow SVG Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-5 h-5"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  </div>
</template>

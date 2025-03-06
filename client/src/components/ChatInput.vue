<script setup lang="ts">
import { useChatStore } from '../composables/chatStore'

// Get state and methods from the chat service
const { userInput, loading, sendMessage } = useChatStore()
</script>

<template>
  <div
    class="flex gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0"
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
      class="min-w-[80px] px-6 py-3 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer text-white rounded-full font-medium text-base transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
    >
      Send
    </button>
  </div>
</template>

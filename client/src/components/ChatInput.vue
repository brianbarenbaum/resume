<script setup lang="ts">
import { useChatService } from '../composables/chatService'

// Get state and methods from the chat service
const { userInput, loading, sendMessage } = useChatService()
</script>

<template>
  <div class="flex gap-2 p-4 border-t border-gray-200">
    <input
      v-model="userInput"
      @keyup.enter="sendMessage"
      placeholder="Ask a question about the resume..."
      :disabled="loading"
      class="flex-1 px-4 py-3 border border-gray-300 rounded-full outline-none focus:border-primary text-base transition-colors"
    />
    <button
      @click="sendMessage"
      :disabled="loading || !userInput.trim()"
      class="min-w-[80px] px-6 py-3 bg-primary text-white rounded-full font-medium text-base transition-colors hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      Send
    </button>
  </div>
</template>

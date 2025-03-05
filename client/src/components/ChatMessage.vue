<script setup lang="ts">
import { computed } from 'vue'
import { useChatService, type Message } from '../composables/chatService'

// Get renderMarkdown function from the chat service
const { renderMarkdown } = useChatService()

// Define props
const props = defineProps<{
  message: Message
}>()

// Pre-compute rendered markdown for better performance
const renderedMarkdown = computed(() => {
  return props.message.type === 'bot' ? renderMarkdown(props.message.text) : ''
})
</script>

<template>
  <div
    :class="[
      'flex items-start gap-3 max-w-[80%] animate-fade-in',
      message.type === 'user' ? 'self-end flex-row-reverse' : '',
    ]"
  >
    <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
      {{ message.type === 'user' ? '👤' : '🤖' }}
    </div>
    <div
      :class="[
        'px-4 py-3 rounded-2xl relative',
        message.type === 'user' ? 'bg-primary text-white' : 'bg-gray-100',
      ]"
    >
      <!-- Use v-html for bot messages to render markdown -->
      <div
        v-if="message.type === 'bot'"
        class="break-words markdown-content"
        v-html="renderedMarkdown"
      ></div>

      <!-- Use regular text for user messages -->
      <div v-else class="break-words">{{ message.text }}</div>
      <div class="text-xs opacity-70 mt-1 text-right">{{ message.time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useChatStore, type Message } from '../composables/chatStore'

// Get renderMarkdown function from the chat service
const { renderMarkdown } = useChatStore()

// Define props
const props = defineProps<{
  message: Message
}>()

// Pre-compute rendered markdown
const renderedMarkdown = computed(() => {
  return props.message.type === 'bot' ? renderMarkdown(props.message.text) : ''
})
</script>

<template>
  <div
    :class="[
      'flex items-start gap-3 max-w-[98%] animate-fade-in',
      message.type === 'user' ? 'self-end flex-row-reverse' : '',
    ]"
  >
    <div
      class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-center text-2xl hidden"
    >
      {{ message.type === 'user' ? '👤' : '🤖' }}
    </div>

    <div
      :class="[
        'px-4 py-3 rounded-2xl relative',
        message.type === 'user'
          ? 'bg-primary text-white'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
      ]"
    >
      <!-- Use v-html for bot messages to render markdown -->
      <div
        v-if="message.type === 'bot'"
        class="break-words markdown-content"
        v-html="renderedMarkdown"
      ></div>

      <!-- Use regular text for user messages -->
      <div v-else class="break-words text-gray-800 dark:text-gray-200">{{ message.text }}</div>
      <div class="text-xs opacity-70 mt-1 text-right text-gray-800 dark:text-gray-200">
        {{ message.time }}
      </div>
    </div>
  </div>
</template>

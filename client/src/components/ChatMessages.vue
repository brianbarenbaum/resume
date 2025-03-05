<script setup lang="ts">
import { onMounted, watch } from 'vue'
import ChatMessage from './ChatMessage.vue'
import ChatLoadingIndicator from './ChatLoadingIndicator.vue'
import { useChatService } from '../composables/chatService'

// Get state and methods from the chat service
const { messages, loading, messagesContainer, scrollToBottom } = useChatService()

// Set the messages container ref when the component is mounted
const containerRef = messagesContainer

// Watch messages for changes and scroll
watch(
  messages,
  () => {
    scrollToBottom()
  },
  { deep: true },
)

// Also scroll when component is mounted to ensure initial visibility
onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div ref="containerRef" class="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
    <ChatMessage v-for="(message, index) in messages" :key="index" :message="message" />

    <ChatLoadingIndicator v-if="loading" />
  </div>
</template>

<script setup lang="ts">
import ChatMessages from '../components/ChatMessages.vue'
import ChatInput from '../components/ChatInput.vue'
</script>

<template>
  <div class="min-h-screen w-full bg-gray-50">
    <div class="max-w-4xl mx-auto p-5 min-h-screen flex flex-col">
      <main class="flex-1 flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
        <ChatMessages />
        <ChatInput />
      </main>
    </div>
  </div>
</template>

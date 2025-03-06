<script setup lang="ts">
import ChatMessages from '../components/ChatMessages.vue'
import ChatInput from '../components/ChatInput.vue'
import ChatExamples from '../components/ChatExamples.vue'
</script>

<template>
  <div class="h-full w-full bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
    <div class="max-w-7xl mx-auto p-5 w-full h-full">
      <!-- Responsive layout container -->
      <div class="flex flex-col md:flex-row gap-4 h-full">
        <!-- Example Questions - Left side on md+ screens, bottom on mobile -->
        <div class="w-full md:w-1/4 order-2 md:order-1 md:h-full">
          <ChatExamples class="md:sticky md:top-5" />
        </div>

        <!-- Main Chat Area - Right side on md+ screens, top on mobile -->
        <div class="w-full md:w-3/4 flex-1 flex flex-col order-1 md:order-2">
          <main
            class="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <ChatMessages class="flex-1" />
            <ChatInput class="flex-shrink-0" />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

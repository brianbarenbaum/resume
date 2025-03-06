<script setup lang="ts">
import { useChatStore } from '../composables/chatStore'

const { askQuestion } = useChatStore()

// Example questions that users can ask
const exampleQuestions = [
  'What experience do you have?',
  'What are your technical skills?',
  'Tell me about your education',
  'What projects have you worked on?',
  'What are your strengths?',
  'Where have you worked before?',
]
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md h-full">
    <div class="p-4">
      <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-3">Example Questions</h3>
      <div class="flex flex-col gap-2">
        <button
          v-for="(question, index) in exampleQuestions"
          :key="index"
          @click="askQuestion(question)"
          class="text-left p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {{ question }}
        </button>
      </div>
    </div>
  </div>
</template>

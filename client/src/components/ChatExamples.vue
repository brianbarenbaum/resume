<script setup lang="ts">
import { useChatStore } from '../composables/chatStore'

const { userInput, sendMessage } = useChatStore()

// Example questions that users can ask
const exampleQuestions = [
  'What experience do you have?',
  'What are your technical skills?',
  'Tell me about your education',
  'What projects have you worked on?',
  'What are your strengths?',
  'Where have you worked before?',
]

// Function to handle question click
function askQuestion(question: string) {
  userInput.value = question
  setTimeout(() => sendMessage(), 10)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md h-full">
    <div class="p-4">
      <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-3">Example Questions</h3>
      <!-- Grid on mobile, column on md+ screens -->
      <div class="grid grid-cols-2 md:grid-cols-1 gap-2">
        <button
          v-for="(question, index) in exampleQuestions"
          :key="index"
          @click="askQuestion(question)"
          class="cursor-pointer text-left p-2 md:p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm md:text-base"
        >
          {{ question }}
        </button>
      </div>
    </div>
  </div>
</template>

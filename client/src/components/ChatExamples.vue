<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '../composables/chatStore'

const { userInput, dispatchMessage } = useChatStore()

// State to track if the section is collapsed
const isCollapsed = ref(false)

// Toggle collapse state
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

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
  setTimeout(() => dispatchMessage(), 10)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md h-full">
    <!-- Header that is not collapsible -->
    <div class="p-4 hidden md:block">
      <h3 class="text-md font-medium text-gray-800 dark:text-white">Example Questions</h3>
    </div>

    <!-- Clickable header with caret icon for mobile only -->
    <div
      @click="toggleCollapse"
      class="md:hidden p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <h3 class="text-lg font-medium text-gray-800 dark:text-white">Example Questions</h3>

      <!-- Up/Down caret icon based on collapsed state -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-5 h-5 text-gray-500 dark:text-gray-400"
        :class="{ 'transform rotate-180': isCollapsed }"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </div>

    <!-- Collapsible content -->
    <div v-if="!isCollapsed" class="px-4 pb-4">
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

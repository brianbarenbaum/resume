<script setup lang="ts">
import { useChatStore } from '../composables/chatStore'
import { computed, ref, onMounted, watch } from 'vue'
import { MAX_CHARACTERS } from '../consts'
import Icon from './AppIcon.vue'

const { userInput, loading, dispatchMessage } = useChatStore()

// Initialize windowWidth safely
const windowWidth = ref(0)

// Update window width on mount and resize
onMounted(() => {
  // Set initial width
  windowWidth.value = window.innerWidth

  // Add resize listener
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})

// Computed property to determine if the button should be visible
const showButton = computed(() => {
  // On mobile (< 768px), only show when there's text
  // On larger screens, always show
  return userInput.value.trim().length > 0 || windowWidth.value >= 768
})

const characterCount = computed(() => userInput.value.length)

// Watch for changes in userInput to enforce character limit
watch(userInput, (newValue) => {
  if (newValue.length > MAX_CHARACTERS) {
    userInput.value = newValue.slice(0, MAX_CHARACTERS)
  }
})
</script>

<template>
  <div
    class="flex flex-col md:flex-row gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0"
  >
    <input
      v-model="userInput"
      @keyup.enter="dispatchMessage"
      placeholder="Ask a question about my resume..."
      :disabled="loading"
      class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full outline-none focus:border-primary bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
    />

    <button
      v-show="showButton"
      @click="dispatchMessage"
      :disabled="loading || !userInput.trim()"
      aria-label="Send message"
      class="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-gray-800 disabled:bg-gray-300 dark:disabled:bg-gray-700 dark:bg-gray-600 hover:bg-gray-700 dark:hover:bg-gray-600 disabled:text-gray-200 text-white dark:text-gray-200 dark:disabled:text-gray-600 cursor-pointer rounded-full transition-colors disabled:cursor-not-allowed self-end md:self-center"
    >
      <!-- Up Arrow Icon -->
      <Icon name="arrow-up" size="20" className="w-5 h-5" />
    </button>

    <div class="text-sm text-gray-600 dark:text-gray-400 self-end md:self-center">
      {{ characterCount }} / {{ MAX_CHARACTERS }}
    </div>
  </div>
</template>

<style scoped>
button {
  opacity: 1;
}

@media (max-width: 767px) {
  button {
    opacity: 0;
    animation: fadeIn 0.6s ease forwards;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

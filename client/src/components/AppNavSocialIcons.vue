<script setup lang="ts">
import Icon from './AppIcon.vue'

const githubUrl = 'https://github.com/brianbarenbaum'
const linkedinUrl = 'https://www.linkedin.com/in/brian-barenbaum-4699923/'
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- GitHub Icon Link -->
    <a
      :href="githubUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="p-2 rounded transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
      aria-label="GitHub Profile"
      title="Visit my GitHub profile"
    >
      <Icon name="github" size="20" className="h-5 w-5" />
    </a>

    <!-- LinkedIn Icon Link -->
    <a
      :href="linkedinUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="p-2 rounded transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
      aria-label="LinkedIn Profile"
      title="Visit my LinkedIn profile"
    >
      <Icon name="linkedin" size="20" className="h-5 w-5" />
    </a>
  </div>
</template>

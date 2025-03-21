<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getResume } from '@/services/api'
import Icon from '../components/AppIcon.vue'
import type { Resume } from '../interfaces'

// Initialize resume data
const resume = ref<Resume | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    resume.value = await getResume()
    loading.value = false
  } catch (err) {
    console.error('Error fetching resume:', err)
    loading.value = false
  }
})

// Format LinkedIn URL
function formatLinkedIn(linkedin: string): string {
  if (linkedin.startsWith('http')) return linkedin
  return `https://linkedin.com/${linkedin}`
}
</script>

<template>
  <div
    class="h-screen bg-gray-50 dark:bg-gray-900 py-2 px-1 sm:px-6 sm:py-6 lg:px-8 overflow-hidden flex flex-col"
  >
    <div class="max-w-4xl mx-auto w-full flex-1 flex flex-col overflow-hidden">
      <div
        class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col flex-1 max-h-[calc(100vh-7rem)]"
      >
        <!-- Loading state -->
        <div v-if="loading" class="p-8 flex justify-center items-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"
          ></div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="p-8 text-center text-red-600 dark:text-red-400">
          {{ error }}
        </div>

        <!-- Resume content -->
        <div v-else-if="resume" class="px-6 md:px-8 pt-6 md:pt-8 pb-2 overflow-y-auto flex-1">
          <!-- Header -->
          <header class="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ resume.name }}</h1>
            <div class="mt-4 flex flex-wrap gap-4 text-gray-600 dark:text-gray-300">
              <div class="flex items-center">
                <Icon name="location" size="20" className="w-5 h-5 mr-2" />
                {{ resume.contact.location }}
              </div>

              <a
                :href="formatLinkedIn(resume.contact.linkedin)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="flex items-center">
                  <Icon name="linkedin" size="20" className="w-5 h-5 mr-2" />
                  <div class="text-blue-600 dark:text-blue-400 hover:underline">LinkedIn</div>
                </div>
              </a>

              <a :href="resume.contact.github" target="_blank" rel="noopener noreferrer">
                <div class="flex items-center">
                  <Icon name="github" size="20" className="w-5 h-5 mr-2" />
                  <div class="text-blue-600 dark:text-blue-400 hover:underline">GitHub</div>
                </div>
              </a>
            </div>
          </header>

          <!-- Summary -->
          <section class="mb-8">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Professional Summary
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ resume.summary }}</p>
          </section>

          <!-- Experience -->
          <section class="mb-8">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Experience
            </h2>

            <div v-for="(job, index) in resume.experience" :key="index" class="mb-6">
              <div class="flex flex-col sm:flex-row sm:justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {{ job.job_title }} at {{ job.company }}
                </h3>
                <span class="text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">{{
                  job.duration
                }}</span>
              </div>

              <div class="text-gray-600 dark:text-gray-400 mb-2">{{ job.location }}</div>

              <ul
                v-if="job.responsibilities"
                class="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300"
              >
                <li
                  v-for="(responsibility, rIndex) in job.responsibilities"
                  :key="rIndex"
                  class="leading-relaxed"
                >
                  {{ responsibility }}
                </li>
              </ul>
            </div>
          </section>

          <!-- Education -->
          <section class="mb-8">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Education</h2>

            <div v-for="(edu, index) in resume.education" :key="index" class="mb-4">
              <div class="flex flex-col sm:flex-row sm:justify-between">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {{ edu.degree }}
                </h3>
                <span class="text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">{{ edu.year }}</span>
              </div>
              <div class="text-gray-700 dark:text-gray-300">{{ edu.institution }}</div>
            </div>
          </section>

          <!-- Skills -->
          <section class="mb-8">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Skills</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="(skills, category) in resume.skills" :key="category" class="mb-4">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 capitalize">
                  {{ category.toString().replace('_', ' ') }}
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(skill, sIndex) in skills"
                    :key="sIndex"
                    class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- Awards -->
          <section class="mb-8">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Awards & Achievements
            </h2>

            <ul class="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li v-for="(award, index) in resume.awards" :key="index" class="leading-relaxed">
                {{ award }}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Print styles */
@media print {
  body {
    background-color: white;
    color: black;
  }

  .max-w-4xl {
    max-width: none;
  }

  .shadow-lg {
    box-shadow: none;
  }

  .bg-white,
  .dark\:bg-gray-800 {
    background-color: white !important;
  }

  .text-gray-900,
  .dark\:text-white,
  .text-gray-800,
  .dark\:text-gray-200 {
    color: black !important;
  }

  .text-gray-700,
  .dark\:text-gray-300,
  .text-gray-600,
  .dark\:text-gray-400 {
    color: #333 !important;
  }

  a {
    text-decoration: none;
    color: black !important;
  }

  .bg-gray-100,
  .dark\:bg-gray-700 {
    background-color: #f3f3f3 !important;
  }
}
</style>

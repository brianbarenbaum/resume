<template>
  <div class="flex items-center space-x-6">
    <router-link
      to="/"
      active-class="text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light"
      class="text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors pb-1"
    >
      Resume Chat
    </router-link>
    <router-link
      to="/resume"
      active-class="text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light"
      class="flex-1text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors pb-1"
    >
      Full Resume
    </router-link>
  </div>
</template>

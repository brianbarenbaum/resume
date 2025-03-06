import { ref, computed, watch, onMounted } from 'vue'

type Theme = 'light' | 'dark' | 'system'

// Create a global state for the theme
const currentTheme = ref<Theme>('system')
const systemDarkMode = ref(false)

// Computed property for determining if dark mode is active
const isDarkMode = computed(() => {
  if (currentTheme.value === 'dark') return true
  if (currentTheme.value === 'system') return systemDarkMode.value
  return false
})

export function useThemeStore() {
  // Apply the theme to the document
  function applyTheme(theme: Theme) {
    currentTheme.value = theme
    localStorage.setItem('theme', theme)

    updateDocumentClass()
  }

  // Update the document class based on current theme settings
  function updateDocumentClass() {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Check system preference for dark mode
  function checkSystemDarkMode() {
    systemDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  // Watch for changes in system preference
  watch(systemDarkMode, () => {
    if (currentTheme.value === 'system') {
      updateDocumentClass()
    }
  })

  // Watch for changes in the theme
  watch(currentTheme, () => {
    updateDocumentClass()
  })

  // Initialize the theme on component mount
  onMounted(() => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') as Theme | null

    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      currentTheme.value = savedTheme
    }

    // Check system preference
    checkSystemDarkMode()

    // Add listener for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      checkSystemDarkMode()
    })

    // Initial application of theme
    updateDocumentClass()
  })

  return {
    currentTheme,
    isDarkMode,
    applyTheme,
  }
}

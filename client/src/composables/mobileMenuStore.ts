import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

export function useMobileMenuStore() {
  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  function closeMenu() {
    isMobileMenuOpen.value = false
  }

  return { isMobileMenuOpen, toggleMobileMenu, closeMenu }
}

export default useMobileMenuStore

// Closure variable to track last action time
let lastActionTime = 0

function createRateLimiter(minIntervalMs = 500) {
  return {
    canProceed: () => {
      const now = Date.now()
      if (now - lastActionTime < minIntervalMs) {
        return false
      }
      lastActionTime = now
      return true
    },

    reset: () => {
      lastActionTime = 0
    },
  }
}

export { createRateLimiter }

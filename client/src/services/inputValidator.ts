import { createRateLimiter } from './rateLimiter'

function validateUserInput(input: string): { isValid: boolean; message?: string } {
  const messageLimiter = createRateLimiter(1000)

  // Check if the user is sending messages too quickly
  if (!messageLimiter.canProceed()) {
    return { isValid: false, message: 'Please wait before sending another message' }
  }

  // Check for empty or whitespace-only input
  if (!input || input.trim() === '') {
    return { isValid: false, message: 'Input cannot be empty' }
  }

  // Check input length
  if (input.length > 1000) {
    return { isValid: false, message: 'Input exceeds maximum length (1000 characters)' }
  }

  // Check for potentially malicious patterns
  const suspiciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // Basic script tag detection
    /javascript:/gi, // javascript: protocol
    /on\w+\s*=/gi, // Inline event handlers
  ]

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(input)) {
      return {
        isValid: false,
        message: 'Input contains potentially unsafe content',
      }
    }
  }

  return { isValid: true }
}

export { validateUserInput }

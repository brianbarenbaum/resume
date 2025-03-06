import { ref, type Ref, nextTick } from 'vue'
import axios from 'axios'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export interface Message {
  text: string
  type: 'user' | 'bot'
  time: string
}

// Create singleton state outside the function
const messages: Ref<Message[]> = ref([
  {
    text: "Hello, I'm Brian's resume bot! I can answer questions about Brian's resume.",
    type: 'bot',
    time: formatTime(),
  },
])

const loading = ref(false)
const userInput = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

// Initialize markdown renderer
marked.setOptions({
  gfm: true,
  breaks: true,
})

// Helper functions
function formatTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function useChatStore() {
  // Render markdown safely
  function renderMarkdown(text: string): string {
    const titleCaseText = snakeToTitleCase(text)
    const capitalizedText = capitalizeFirstOnly(titleCaseText)
    const rawHtml = marked(capitalizedText)
    return DOMPurify.sanitize(rawHtml as string)
  }

  function snakeToTitleCase(input: string): string {
    return input.replace(/\b[A-Za-z]+(?:_[A-Za-z]+)+\b/g, (match) => {
      return match
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    })
  }

  function capitalizeFirstOnly(input: string): string {
    return input.replace(/\b[A-Z]+\b/g, (match) => {
      return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
    })
  }

  // Scroll to bottom of messages
  async function scrollToBottom(): Promise<void> {
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }

  // Send a message to the API
  async function sendMessage(): Promise<void> {
    const text = userInput.value.trim()
    if (!text || loading.value) return

    // Add user message
    messages.value.push({
      text,
      type: 'user',
      time: formatTime(),
    })

    userInput.value = ''
    loading.value = true

    try {
      // Send request to API
      const response = await axios.post('/api/query', {
        question: text,
      })

      // Add bot response
      messages.value.push({
        text: response.data.response,
        type: 'bot',
        time: formatTime(),
      })
    } catch (error) {
      // Add error message
      messages.value.push({
        text: 'Sorry, I encountered an error while processing your question. Please try again.',
        type: 'bot',
        time: formatTime(),
      })
      console.error('Error sending message:', error)
    } finally {
      loading.value = false
      await scrollToBottom()
    }
  }

  // Expose public API
  return {
    messages,
    loading,
    userInput,
    messagesContainer,
    renderMarkdown,
    scrollToBottom,
    sendMessage,
  }
}

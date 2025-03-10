import axios from 'axios'

function getApiUrl(route: string) {
  const config = {
    // Local development
    development: {
      apiUrl: `http://localhost:8787/api/${route}`,
    },
    // Production on Cloudflare
    production: {
      apiUrl: `https://resume.brianbarenbaum.workers.dev/api/${route}`,
    },
  }

  // Determine current environment
  const environment = import.meta.env.PROD ? 'production' : 'development'
  return config[environment].apiUrl
}

async function sendChatMessage(question: string) {
  const route = 'query'
  const apiUrl = getApiUrl(route)

  try {
    const ret = await axios.post(apiUrl, {
      question,
    })
    return ret.data.response
  } catch (error) {
    console.error('Error sending message:', error)
    throw new Error(error as string)
  }
}

async function getResume() {
  const route = 'resume'
  const apiUrl = getApiUrl(route)
  const ret = await axios.get(apiUrl)
  return ret.data
}

export { sendChatMessage, getResume }

// Environment-based configuration
const config = {
  // Local development
  development: {
    apiUrl: 'http://localhost:8787/api/query',
  },
  // Production on Cloudflare
  production: {
    apiUrl: 'https://resume.brianbarenbaum.workers.dev/api/query',
  },
}

// Determine current environment
const environment = import.meta.env.PROD ? 'production' : 'development'
console.log('ENVIRONMENT:', environment)

export default config[environment]

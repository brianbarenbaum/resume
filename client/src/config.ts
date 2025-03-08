
// Environment-based configuration

export function getApiUrl() {
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
  console.log('VITE_CODESPACES:', import.meta.env.VITE_CODESPACES)
  
  // If running in Codespaces, use the Codespaces URL
  if (environment === 'development' && import.meta.env.VITE_CODESPACES) {
    const codespacesUrl = import.meta.env.VITE_CODESPACES_URL
    config.development.apiUrl = `https://${codespacesUrl}/api/query`
  }
  
  return config[environment].apiUrl
}

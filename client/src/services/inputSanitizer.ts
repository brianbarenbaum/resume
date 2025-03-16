import DOMPurify from 'dompurify'

function sanitizeInput(input: string): string {
  const purifyConfig = {
    ALLOWED_TAGS: [
      'img',
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'a',
      'strong',
      'em',
      'code',
      'pre',
      'blockquote',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'hr',
      'br',
    ],
    ALLOWED_ATTR: ['src', 'alt', 'href', 'target', 'rel', 'class'],
  }

  return DOMPurify.sanitize(input, purifyConfig)
}

export { sanitizeInput }

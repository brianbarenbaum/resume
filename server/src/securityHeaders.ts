export function getSecurityHeaders() {
	return {
		'Content-Security-Policy': "default-src 'self'; script-src 'self'; object-src 'none';",
		'X-Content-Type-Options': 'nosniff',
		'X-Frame-Options': 'DENY',
		'X-XSS-Protection': '1; mode=block',
		'Referrer-Policy': 'no-referrer-when-downgrade',
		'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
	};
}

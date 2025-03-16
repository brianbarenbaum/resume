function corsHeaders(request: Request) {
	// List of allowed origins
	const allowedOrigins = [
		'http://localhost:5173', // Vite dev server
		'https://resume-bnf.pages.dev',
		'https://www.brianbarenbaum.com',
	];

	// Get the Origin header from the request
	const origin = request.headers.get('Origin') || '';

	// Check if the origin is in our allowed list
	const isAllowedOrigin = allowedOrigins.includes(origin);

	return {
		'Content-Type': 'application/json',
		// If origin is allowed, echo it back, otherwise don't set the header
		...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		// Allow credentials if needed (cookies, authorization headers)
		'Access-Control-Allow-Credentials': 'true',
	};
}

function handleCORS(request: Request) {
	return new Response(null, {
		status: 204,
		headers: corsHeaders(request),
	});
}

export { corsHeaders, handleCORS };

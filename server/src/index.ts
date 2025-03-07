import { run } from './chat';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// Handle CORS preflight requests
		if (request.method === 'OPTIONS') {
			return handleCORS(request);
		}

		// Only allow POST requests to /api/query
		const url = new URL(request.url);
		if (request.method === 'POST' && url.pathname === '/api/query') {
			try {
				const requestData = (await request.json()) as { question?: string };
				const { question } = requestData;

				if (!question) {
					return new Response(JSON.stringify({ error: 'Question is required' }), {
						status: 400,
						headers: corsHeaders(request),
					});
				}

				const response = await run(question, env.GEMINI_API_KEY);

				return new Response(JSON.stringify({ question, response }), {
					status: 200,
					headers: corsHeaders(request),
				});
			} catch (error) {
				console.error('Error processing request:', error);
				return new Response(JSON.stringify({ error: 'Internal server error' }), {
					status: 500,
					headers: corsHeaders(request),
				});
			}
		}

		// Handle other routes
		return new Response('Not found', { status: 404, headers: corsHeaders(request) });
	},
};
function corsHeaders(request: Request) {
	// List of allowed origins
	const allowedOrigins = [
		'http://localhost:5173', // Vite dev server
		'https://resume-bnf.pages.dev',
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

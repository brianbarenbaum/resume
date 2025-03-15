import { handleResumeRequest, handleQueryRequest } from './requestHandlers';
import { handleCORS, corsHeaders } from './corsHandler';
import { checkRateLimit, RateLimiterConfig } from './rateLimiter';
import { getSecurityHeaders } from './securityHeaders';

const RATE_LIMIT_CONFIG: RateLimiterConfig = {
	rateLimit: 10, // Max requests per period
	windowSeconds: 60, // Time window in seconds
};

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const securityHeaders = getSecurityHeaders();

		// Handle CORS preflight requests
		if (request.method === 'OPTIONS') {
			return handleCORS(request);
		}

		const { isRateLimited, retryAfter } = await checkRateLimit(request, env, RATE_LIMIT_CONFIG);

		if (isRateLimited) {
			console.error('Rate limit exceeded. Please try again later.');
			return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
				status: 429,
				headers: { ...corsHeaders(request), ...securityHeaders, 'Retry-After': `${retryAfter}` },
			});
		}

		const url = new URL(request.url);

		if (request.method === 'GET' && url.pathname === '/api/resume') {
			return handleResumeRequest(request, securityHeaders);
		}

		if (request.method === 'POST' && url.pathname === '/api/query') {
			return handleQueryRequest(request, env, securityHeaders);
		}

		// Handle other routes
		return new Response('Not found', { status: 404, headers: corsHeaders(request) });
	},
};

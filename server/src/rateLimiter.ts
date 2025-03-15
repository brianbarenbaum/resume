// server/src/rateLimiter.ts

export interface RateLimiterConfig {
	rateLimit: number;
	windowSeconds: number;
}

export async function checkRateLimit(
	request: Request,
	env: Env,
	config: RateLimiterConfig
): Promise<{ isRateLimited: boolean; retryAfter: number }> {
	const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown-ip';
	const key = `rate-limit:${clientIP}`;
	const now = Date.now();
	const windowStart = now - config.windowSeconds * 1000;

	// Fetch the current count and timestamps from KV
	let data = (await env.RATE_LIMIT.get(key, { type: 'json' })) as { count: number; timestamps: number[] } | null;

	if (!data) {
		data = { count: 0, timestamps: [] };
	}

	// Filter out timestamps that are outside the current window
	data.timestamps = data.timestamps.filter((timestamp) => timestamp > windowStart);

	// Check if the rate limit is exceeded
	if (data.timestamps.length >= config.rateLimit) {
		return { isRateLimited: true, retryAfter: config.windowSeconds };
	}

	// Add the current timestamp and update the count
	data.timestamps.push(now);
	data.count = data.timestamps.length;

	// Store the updated data back in KV
	await env.RATE_LIMIT.put(key, JSON.stringify(data));

	return { isRateLimited: false, retryAfter: 0 };
}

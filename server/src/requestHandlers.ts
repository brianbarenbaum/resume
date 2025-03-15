import resumeData from '../input/resume.json';
import { validateInput } from './inputValidator';
import { run } from './chat';
import xss from 'xss';
import { corsHeaders } from './corsHandler';

export async function handleResumeRequest(request: Request, securityHeaders: HeadersInit): Promise<Response> {
	return new Response(JSON.stringify(resumeData), {
		status: 200,
		headers: { ...corsHeaders(request), ...securityHeaders },
	});
}

export async function handleQueryRequest(request: Request, env: Env, securityHeaders: HeadersInit): Promise<Response> {
	try {
		const requestData = (await request.json()) as { question?: string };
		const { question } = requestData;

		const validationResult = validateInput(question);

		if (!validationResult.isValid) {
			return new Response(JSON.stringify({ error: validationResult.message }), {
				status: 400,
				headers: { ...corsHeaders(request), ...securityHeaders },
			});
		}

		const sanitizedQuestion = xss(question!);
		const response = await run(sanitizedQuestion, env.GEMINI_API_KEY);

		return new Response(JSON.stringify({ sanitizedQuestion, response }), {
			status: 200,
			headers: { ...corsHeaders(request), ...securityHeaders },
		});
	} catch (error) {
		console.error('Error processing request:', error);
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: { ...corsHeaders(request), ...securityHeaders },
		});
	}
}

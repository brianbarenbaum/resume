import { GoogleGenerativeAI } from '@google/generative-ai';
import resumeData from '../input/resume.json';

interface Job {
	job_title: string;
	company: string;
	location: string;
	duration: string;
	responsibilities?: string[];
}

interface Resume {
	summary: string;
	experience: Job[];
	education: { degree: string; institution: string; year: number | string }[];
	awards: string[];
	skills: { [category: string]: string[] };
}

async function run(queryTexts = 'What awards did brian win?', apiKey: string) {
	const resumeContent = await parseResume();
	const processedQuery = preprocessQuery(queryTexts);
	const response = await askGemini(resumeContent, processedQuery, apiKey);
	return response.text();
}

async function parseResume(): Promise<string> {
	const resume: Resume = resumeData;

	return [
		`SUMMARY\n${resume.summary}`,

		`EXPERIENCE\n${resume.experience
			.map(
				(job: Job) =>
					`${job.job_title} | ${job.company} | ${job.location} | ${job.duration}\n${
						job.responsibilities ? job.responsibilities.map((r) => `• ${r}`).join('\n') : ''
					}`
			)
			.join('\n\n')}`,

		`EDUCATION\n${resume.education.map((edu) => `${edu.degree} | ${edu.institution} | ${edu.year}`).join('\n')}`,

		`AWARDS\n${resume.awards.join('\n')}`,

		`SKILLS\n${Object.entries(resume.skills)
			.map(([category, skills]) => `${category.toUpperCase()}: ${skills.join(', ')}`)
			.join('\n')}`,
	].join('\n\n');
}

function isDogRequest(question: string): boolean {
	const normalizedQuery = question.toLowerCase();
	return normalizedQuery.includes('can you show me a picture of brians dog?');
}

function preprocessQuery(query: string): string {
	// Define name variations to replace
	const namePatterns = [/\bBrian\b/gi, /\bBrian Barenbaum\b/gi, /\bMr\. Barenbaum\b/gi, /\bBarenbaum\b/gi];

	// Replace all name variations with "the resume subject"
	let processedQuery = query;
	namePatterns.forEach((pattern) => {
		processedQuery = processedQuery.replace(pattern, 'the resume subject');
	});

	return processedQuery;
}

async function askGemini(context: string, question: string, apiKey: string) {
	const GEMINI_API_MODEL = 'gemini-2.0-flash-lite';

	const genAI = new GoogleGenerativeAI(apiKey);
	const model = genAI.getGenerativeModel({ model: GEMINI_API_MODEL });

	let promptAdditional = '';

	// If this is a dog picture request, add special handling instructions
	if (isDogRequest(question)) {
		console.log('isDogRequest', question);
		promptAdditional = `
    12. If the user is asking to see a picture of Brian's dog, your response should be:
       "I thought you would never ask!  Here is a cute picture of Brian's dog:
       
       ![Waffles](/waffles.jpeg)
       
       This is Waffles, Brian's beloved dog. Is there anything else you'd like to know about Brian's resume?"
    `;
	}

	const prompt = `
      Given this resume content:
  
      ${context}
  
      Answer the question: ${question}
      
      Instructions:
      1. Analyze the provided resume sections carefully
      2. Look for explicit mentions of the requested information
      3. If found, provide a clear and specific answer using only information from the context
      4. If not found, identify which specific piece of information is missing
      5. The words "manager" and "supervisor" can be used interchangeably when looking for an answer.
      6. When providing the answer, anywhere that you would write "The resume subject", write "Brian" instead.
      7. When the subject of the question is "you", that means the question is about Brian and his resume.
      8. If asked about awards, mention both awards that the subject of the resume won.
      9. For questions about work experience, or jobs:
         - List ALL roles in chronological order
         - Include ALL technologies mentioned for each role
         - Keep jobs in chronological order
         - Be specific about which technologies were used at which jobs
      10. The experience section lists where Brian worked
      11. For all answers, use markdown formatting, always use bullet points and never output any text using snake case.  
      ${promptAdditional}

			Please provide your response in a clear, direct manner.
    `;

	const result = await model.generateContent(prompt);
	return result.response;
}

export { run };

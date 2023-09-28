import type { Message } from '$lib/models/openai';

export async function makeOpenAIRequest(
	prompt: string,
	model = '3.5-turbo',
	messages: Message[] = [],
	temperature = 0.8,
	frequency_penalty = 0.5,
	presence_penalty = 0.0,
	top_p = 1.0
) {
	const openAi = await fetch('/api/prompt', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			prompt,
			model,
			messages,
			options: {
				temperature,
				frequency_penalty,
				presence_penalty,
				top_p
			}
		})
	});

	const openAiResponse = await openAi.json();
	console.log(openAiResponse, 'openAiResponse');

	return openAiResponse;
}

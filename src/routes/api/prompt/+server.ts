import { OPENAI_API_KEY } from '$env/static/private';
import { jsonResponse } from '$lib/helpers';
import type { Message } from '$lib/models/openai';
import type { RequestEvent } from '@sveltejs/kit';

import { Configuration, OpenAIApi } from 'openai';

function createOpenAIConfiguration() {
	const configuration = new Configuration({
		organization: 'org-xCLPnAZdhBauG0ecnIbHm7vF',
		apiKey: OPENAI_API_KEY
	});
	const openai = new OpenAIApi(configuration);
	return openai;
}

export async function POST({ request }: RequestEvent) {
	const openAiConfig = createOpenAIConfiguration();

	const openAi = await request.json();
	const {
		prompt,
		model,
		options,
		messages
	}: {
		prompt: string;
		model: string;
		options: {
			temperature: number;
			frequency_penalty: number;
			presence_penalty: number;
			top_p: number;
		};
		messages: Message[];
	} = openAi;

	const { temperature, frequency_penalty, presence_penalty, top_p } = options;
	console.log('MESSAGES', messages);

	const completion = await openAiConfig.createChatCompletion({
		model: `gpt-${model}`,
		messages: messages,
		max_tokens: 1024,
		temperature,
		top_p,
		frequency_penalty,
		presence_penalty
	});

	const {
		data: { choices }
	} = completion;
	return jsonResponse({ choices }, 200);
}

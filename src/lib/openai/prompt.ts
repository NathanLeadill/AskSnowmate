import { Configuration, OpenAIApi } from 'openai';

const apiKeys = [
	'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',
	'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'
];

function createOpenAIConfiguration() {
	const configuration = new Configuration({
		organization: 'org-xCLPnAZdhBauG0ecnIbHm7vF',
		apiKey: apiKeys[0]
	});
	const openai = new OpenAIApi(configuration);
	return openai;
}

async function promptOpenAI(openAiConfig: OpenAIApi, prompt: string) {
	const completion = await openAiConfig.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'assistant',
				content: 'Hello, how are you?'
			},
			{
				role: 'user',
				content: prompt
			}
		],
		max_tokens: 516,
		temperature: 0.8,
		top_p: 1.0,
		frequency_penalty: 0.5,
		presence_penalty: 0.0
	});

	const {
		data: { choices }
	} = completion;
	return choices[0].message.content;
}

export async function makeOpenAIRequest(prompt: string) {
	const openAiConfig = createOpenAIConfiguration();
	return await promptOpenAI(openAiConfig, prompt);
}

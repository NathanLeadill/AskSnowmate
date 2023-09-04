<script lang="ts">
	import { Configuration, OpenAIApi } from 'openai';
	import { PUBLIC_OPENAI_API_KEY } from '$env/static/public';

	function createOpenAIConfiguration(count: number) {
		const configuration = new Configuration({
			organization: 'org-xCLPnAZdhBauG0ecnIbHm7vF',
			apiKey: PUBLIC_OPENAI_API_KEY
		});
		const openai = new OpenAIApi(configuration);
		return openai;
	}

	async function spamFunction(openAiConfig: OpenAIApi) {
		const completion = await openAiConfig.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'user',
					content: 'hello world'
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
		console.log('Choices', choices);

		console.log('Choices', choices[0]);
	}

	function runFunctions() {
		for (let i = 0; i < 2; i++) {
			const open = createOpenAIConfiguration(i);
			spamFunction(open);
		}
	}

	// create a function that will loop spamFunction every 2 seconds
	// and then call it

	function startInterval() {
		setInterval(runFunctions, 1000);
	}
</script>

<button on:click={startInterval}>Spam</button>
<button on:click={startInterval}>Spam</button>
<button on:click={startInterval}>Spam</button>
<button on:click={startInterval}>Spam</button>
<button on:click={startInterval}>Spam</button>
<button on:click={startInterval}>Spam</button>
<button on:click={startInterval}>Spam</button>

<button on:click={runFunctions}>RUN FUNCTIONS</button>

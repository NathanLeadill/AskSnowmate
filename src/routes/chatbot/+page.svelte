<!-- Create basic svelte file -->
<script lang="ts">
	import { conversationStore } from '$lib/stores';
	import { Configuration, OpenAIApi } from 'openai';
	const tempApiKey = 'test';
	const configuration = new Configuration({
		apiKey: tempApiKey
	});
	const openai = new OpenAIApi(configuration);
	let message = '';

	async function addUserMessageToConversationStore(content: string) {
		await conversationStore.update((messages) => {
			messages.push({
				role: 'user',
				content
			});
			return messages;
		});
	}

	async function addAssistantMessageToConversationStore(content: string) {
		await conversationStore.update((messages) => {
			messages.push({
				role: 'assistant',
				content
			});
			return messages;
		});
	}

	function clearInput() {
		message = '';
	}

	async function onSendClick() {
		await addUserMessageToConversationStore(message);
		console.log('UPDATED STORE', $conversationStore);

		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: $conversationStore,
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

		await addAssistantMessageToConversationStore(choices[0].message?.content);
		clearInput();
	}

	$: entriesForConversation = $conversationStore.filter((entry) => {
		if (entry.role === 'system') return false;
		return {
			role: entry.role,
			content: entry.content
		};
	});

	function checkIfMessageIsAction(message: string) {
		console.log('Message', message);
	}
</script>

<main>
	<h1>Chatbot</h1>
	<p>Chatbot page</p>

	<div class="chatarea">
		<div class="chatarea--header">
			<span>Travel Planner Chat</span>
		</div>
		<div class="chatarea--content">
			{#each entriesForConversation as entry}
				<div class={`chatarea--message chatarea--message_${entry.role}`}>
					<p>{entry.content}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="chatarea--footer">
		<form on:submit|preventDefault={onSendClick}>
			<textarea class="chatarea--footer_input" bind:value={message} rows="10" cols="50" />
			<div class="chatarea--footer_options">
				<button id="send" type="submit">Send</button>
				<button id="clear" on:click={clearInput}>Clear</button>
			</div>
		</form>
	</div>
</main>

<style>
	.chatarea {
		background-color: grey;
		height: 500px;
		display: flex;
		flex-direction: column;
		border-radius: 25px;
	}
	.chatarea--header {
		background-color: white;
		height: 50px;
		border-top-left-radius: 25px;
		border-top-right-radius: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.chatarea--header span {
		font-size: 18px;
		font-weight: 700;
		text-transform: uppercase;
	}
	.chatarea--content {
		background-color: white;
		height: auto;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		overflow: scroll;
		/* Create CSS Rules to make this element fill all remaining space in parent  container */
	}

	.chatarea--message {
		padding: 10px;
		margin: 10px;
		border-radius: 10px;
		width: 100%;
		display: block;
		max-width: fit-content;
	}

	.chatarea--message_user {
		float: left;
		background: lightblue;
	}

	.chatarea--message_assistant {
		margin-left: auto;
		background: grey;
	}

	.chatarea--footer {
		background-color: white;
		height: 100px;
		border-bottom-left-radius: 25px;
		border-bottom-right-radius: 25px;
		display: flex;
	}

	.chatarea--footer form {
		flex-grow: 1;
		display: flex;
		flex-direction: row;
	}
	.chatarea--footer_input {
		flex-basis: 90%;
		resize: none;
	}
	.chatarea--footer_options {
		display: flex;
		flex-direction: column;
		flex-basis: 10%;
	}
	.chatarea--footer_options button {
		flex-basis: 50%;
		width: 100%;
	}
</style>

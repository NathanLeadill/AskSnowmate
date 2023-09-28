<script lang="ts">
	import { makeOpenAIRequest } from '$lib/openai/prompt';
	import { aiMessageStore, questStore } from '$lib/stores';
	import FaPaperPlane from 'svelte-icons/fa/FaPaperPlane.svelte';
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';
	import { scale } from 'svelte/transition';

	let message = '';
	function closeChatbot() {
		console.log('test');
	}

	async function sendMessage() {
		// Add message before request .
		aiMessageStore.update((store) => {
			store.push({
				role: 'user',
				content: message
			});
			return store;
		});
		const { choices } = await makeOpenAIRequest('', '4', [
			{
				role: 'system',
				content:
					`Your name is snowmate, you are a helpful travel assistant.\n 
            Below is an itinerary for a user who wishes to go on holiday. The user will input messages to change parts of this itinerary.\n\n
            ${$questStore.itinerary}` || ''
			},
			{
				role: 'user',
				content: message
			}
		]);

		// Add message after request .
		aiMessageStore.update((store) => {
			store.push({
				role: 'assistant',
				content: choices[0].message.content
			});
			return store;
		});
		// Reset message input to empty
		message = '';
	}
	function handleEnter(event: KeyboardEvent) {
		if (event.metaKey && event.which === 13) {
			sendMessage();
		}
	}
</script>

<div class="chatbot-quest-container">
	<div class="chatbot-quest">
		<div class="chatbot-quest--header">
			<h4 class="chatbot-quest--title">Chatbot</h4>
			<button class="chatbot-quest--close" on:click={closeChatbot}>
				<FaTimes />
			</button>
		</div>
		<div class="chatbot-quest--content">
			<!-- <div class="chatbot-quest--message_user">
				<div class="chatbot-quest--message">
					<p class="chatbot-quest--message-content">test</p>
				</div>
			</div>
			<div class="chatbot-quest--message_assistant">
				<div class="chatbot-quest--message">
					<p class="chatbot-quest--message-content">test</p>
				</div>
			</div> -->
			{#each $aiMessageStore as message}
				{#if message.role === 'user'}
					<div class="chatbot-quest--message_user" in:scale={{ duration: 500 }}>
						<div class="chatbot-quest--message">
							<p class="chatbot-quest--message-content">{message.content}</p>
						</div>
					</div>
				{:else}
					<div class="chatbot-quest--message_assistant" in:scale={{ duration: 500 }}>
						<div class="chatbot-quest--message">
							<p class="chatbot-quest--message-content">{message.content}</p>
						</div>
					</div>
				{/if}
			{/each}
		</div>
		<div class="chatbot-quest--footer">
			<div class="chatbot-quest--input">
				<input
					type="text"
					placeholder="Type your message here..."
					bind:value={message}
					on:keydown={handleEnter}
				/>
				<button class="chatbot-quest--send" on:click={sendMessage}>
					<FaPaperPlane />
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.chatbot-quest-container {
		z-index: 100;
		width: 100%;
		height: 100%;
		display: flex;
		padding: 0 25px 25px 25px;
		margin: 20px 50px 50px 50px;
		justify-content: center;
	}
	.chatbot-quest {
		background-color: white;
		border-radius: 25px;
		width: 75%;
		height: 500px;
		display: flex;
		flex-direction: column;
	}
	.chatbot-quest--header {
		display: flex;
	}
	.chatbot-quest--title {
		font-family: Sora;
		font-weight: 700;
		font-size: 20px;
		color: #4fa7f4;
		margin: 0;
		flex-grow: 1;
		padding: 10px;
	}

	.chatbot-quest--close {
		border: none;
		height: 50px;
		background: none;
	}
	.chatbot-quest--close:hover {
		cursor: pointer;
	}
	.chatbot-quest--content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.chatbot-quest--message_user {
		width: 100%;
		display: flex;
		justify-content: start;
	}

	.chatbot-quest--message_assistant {
		width: 100%;
		display: flex;
		justify-content: right;
	}

	.chatbot-quest--message_user .chatbot-quest--message {
		background: blue;
		width: auto;
		border-radius: 10px;
		padding: 10px;
		margin: 10px 0 15px 0;
	}

	.chatbot-quest--message_assistant .chatbot-quest--message {
		background: yellow;
		width: auto;
		border-radius: 10px;
		padding: 10px;
		margin: 10px 10px 15px 0;
	}

	.chatbot-quest--footer {
		border-top: 2px solid black;
	}
	.chatbot-quest--message-content {
		margin: 0;
	}
	.chatbot-quest--input {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px 0 0;
	}
	.chatbot-quest--input input {
		width: 87%;
		height: 54px;
		border-bottom-left-radius: 25px;
		border: 0;
		padding: 0 20px;
	}

	.chatbot-quest--input input:focus {
		outline: none;
	}
	.chatbot-quest--send {
		height: 50px;
		width: 50px;
		margin: 10px;
		background: none;
		border: none;
	}
	.chatbot-quest--send:hover {
		cursor: pointer;
	}
</style>

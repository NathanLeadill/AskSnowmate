<script lang="ts">
	import Spinner from '$lib/components/spinner.svelte';
	import type { Quest } from '$lib/models/quests';
	import { makeOpenAIRequest } from '$lib/openai/prompt';
	import { onMount } from 'svelte';

	import FaCloudMeatball from 'svelte-icons/fa/FaCloudMeatball.svelte';
	import FaMapMarkerAlt from 'svelte-icons/fa/FaMapMarkerAlt.svelte';
	import FaMoneyBillWave from 'svelte-icons/fa/FaMoneyBillWave.svelte';
	import IoIosChatbubbles from 'svelte-icons/io/IoIosChatbubbles.svelte';

	export let quest: Quest;

	let infoBoxData: string[] = [];
	let selectedPrompt = 0;
	let selectedTitle = '';

	const questInformationTitles = ['Location', 'Weather', 'Cost of Living', 'Languages'];

	const questInformationPrompts = [
		`Give me a 25 word description of what ${quest.country} is known for, for a visitor, end the response with 2 -'s'`,
		`Give me a 30 word description of the average weather in ${
			quest.country
		} during the period from ${new Date(quest.departureDate).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		})} to ${new Date(quest.returnDate).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		})}, end the response with 2 -'s'`,
		`Tell me the price of a cup of coffee in ${quest.country} as of your last Update in 5 words, end the response with 2 -'s'`,
		`In 25 words tell me what languages are spoken in ${quest.country}, end the response with 2 -'s'`
	];

	async function runPrompts() {
		const test = await makeOpenAIRequest(questInformationPrompts.join(' and then, ') + ' After ');
		if (test) {
			console.log('TEST', test);

			infoBoxData = test?.split('--').filter((item) => item !== '');
			console.log('INFOBOX', infoBoxData);

			selectedPrompt = infoBoxData[0];
			selectedTitle = questInformationTitles[0];
		}
	}

	onMount(() => {
		runPrompts();
	});

	function selectPrompt(buttonId: number) {
		console.log('CLICK');

		selectedTitle = questInformationTitles[buttonId];
		selectedPrompt = infoBoxData[buttonId];
	}
</script>

<div class="quest-info-box">
	{#if selectedPrompt}
		<h4 class="quest-info--header">{selectedTitle}</h4>
		<p class="quest-info-box--content">
			{selectedPrompt}
		</p>
	{:else}
		<div class="spinner-container">
			<Spinner />
		</div>
	{/if}
	<div class="quest-info-box--footer">
		<button class="quest-info-box--button" on:click={() => selectPrompt(0)}>
			<FaMapMarkerAlt />
		</button>
		<button class="quest-info-box--button" on:click={() => selectPrompt(1)}>
			<FaCloudMeatball />
		</button>
		<button class="quest-info-box--button" on:click={() => selectPrompt(2)}>
			<FaMoneyBillWave />
		</button>
		<button class="quest-info-box--button" on:click={() => selectPrompt(3)}>
			<IoIosChatbubbles />
		</button>
	</div>
</div>

<style>
	.quest-info-box {
		background: white;
		border-radius: 15px;
		padding: 15px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		-webkit-box-shadow: 1px 42px 56px 15px rgba(0, 0, 0, 0.29);
		-moz-box-shadow: 1px 42px 56px 15px rgba(0, 0, 0, 0.29);
		box-shadow: 1px 42px 56px 15px rgba(0, 0, 0, 0.29);
		min-width: 100%;
		height: 182px;
		width: 460px;
	}
	.quest-info--header {
		font-family: Sora;
		color: #4fa7f4;
		font-weight: 600;
		font-size: 20px;
		margin: 0 0 10px 0;
	}
	.quest-info-box--content {
		margin: 0 0 20px 0;
		color: #4fa7f4;
		font-family: Sora;
		line-height: 1.4;
		font-size: 15px;
		text-align: center;
		flex-grow: 1;
	}
	.quest-info-box--footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 60%;
	}
	.quest-info-box--button {
		height: 30px;
		width: 30px;
		display: flex;
		padding: 3px;
		border: 4px solid #4fa7f3;
		border-radius: 50%;
		background: transparent;
		align-items: center;
		color: #4fa7f3;
	}
	.quest-info-box--button:hover {
		cursor: pointer;
		background: #4fa7f3;
		color: white;
	}
	.spinner-container {
		margin: 10px 0 20px;
		flex-grow: 1;
	}
</style>

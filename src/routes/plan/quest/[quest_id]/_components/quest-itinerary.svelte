<script lang="ts">
	import type { Quest } from '$lib/models/quests';
	import { makeOpenAIRequest } from '$lib/openai/prompt';
	import { onMount } from 'svelte';
	export let quest: Quest;

	let itinerary: string[] = [];

	async function fetchItinerary() {
		console.log('TEST');

		const itineraryRequest = await makeOpenAIRequest(
			`Plan me a 3 day itinerary for a journey to ${quest.country}. This journey is for ${quest.groupSize} people, we want to stay in a ${quest.accommodation.minimumQuality}* or better ${quest.accommodation.type}. Separate each day with a double new line.`
		);
		console.log('Itinerary Request', itineraryRequest);

		itinerary = itineraryRequest
			?.split('\n\n')
			.filter((item) => item !== '')
			.map((item) => item.split('\n'));
	}

	onMount(() => {
		console.log('YOUTUBE');

		fetchItinerary();
	});

	const test = ['Day 1', 'Visit the Eiffel Tower', 'Visit the Louvre', 'Visit the Arc de Triomphe'];
	// console log each item from the above array except the first one
	console.log(test.slice(1));
</script>

<div class="itinerary">
	{#each itinerary as day}
		<div class="day">
			<h4 class="itinerary-day--label">{day[0]}</h4>
			{#each day.slice(1) as items}
				<p class="itinerary-day--item">{items}</p>
			{/each}
			<!-- {JSON.stringify(day, null, 2)} -->
		</div>
	{/each}
</div>

<style>
	.itinerary {
		background: white;
		border-radius: 12px;
		width: 500px;
	}
	.day {
		padding: 5px 25px;
		margin: 20px 0;
	}
	.itinerary-day--label {
		font-family: Sora;
		font-size: 24px;
		font-weight: 700;
		text-transform: uppercase;
		margin: 0 auto;
	}

	.itinerary-day--item {
		font-family: Sora;
		font-size: 16px;
		font-weight: 400;
		margin: 10px auto;
	}
</style>

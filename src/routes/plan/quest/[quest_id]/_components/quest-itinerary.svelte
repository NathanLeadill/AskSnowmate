<script lang="ts">
	import type { Quest } from '$lib/models/quests';
	import { makeOpenAIRequest } from '$lib/openai/prompt';
	import { questStore } from '$lib/stores';
	import { onMount } from 'svelte';
	export let quest: Quest;

	let itinerary: string[][] = [];

	async function fetchItinerary() {
		itinerary = new String($questStore.itinerary)
			?.split('...')
			.map((item: string) => item.split('\n').filter((item: string) => item !== ''))
			.filter((el) => el.length > 2);
		return itinerary;
	}

	async function fetchItineraryLive() {
		const { choices } = await makeOpenAIRequest(
			`Plan me a ${quest.lengthOfStay} day trip to ${quest.country}, the trip will start on ${quest.departureDate} and will last until ${quest.returnDate}. We would like to stay in a ${quest.accommodation.minimumQuality}* ${quest.accommodation.type}. Please find me activities like museums and galleries to visit. After each entry please provide the link to their website in double square brackets, do this for the hotel too. Ensure at the end of each days list of activities you display 3 full stops.`,
			'4',
			[],
			0
		);

		const message: string = choices[0].message.content;

		itinerary = message
			?.split('...')
			.filter((item: string) => item !== '')
			.map((item: string) => item.split('\n'));

		questStore.update((store) => {
			store.itinerary = itinerary;
			return store;
		});
	}

	onMount(() => {
		console.log('YOUTUBE');

		fetchItinerary();
	});

	function createLink(link: string) {
		const linkString = link.match(/\[\[(.*?)\]\]/);
		if (linkString) {
			return link.replace(
				/\[\[(.*?)\]\]/g,
				`<a href="${linkString[1]}" target="_blank">Book Now</a>`
			);
		} else return link;
	}
</script>

<div class="itinerary">
	{#each itinerary as day}
		<div class="day">
			<h4 class="itinerary-day--label">{day[0]}</h4>
			{#each day.slice(1) as items}
				{#if items.includes('[[')}
					<p class="itinerary-day--item itinerary-day--link">{@html createLink(items)}</p>
				{:else}
					<p class="itinerary-day--item">{items}</p>
				{/if}
			{/each}
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

	:global(a) {
		color: #4fa7f4;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.8rem;
		letter-spacing: 0.06rem;
	}
</style>

<script lang="ts">
	import { questStore } from '$lib/stores';
	import QuestInfoBox from './_components/quest-info-box.svelte';
	import QuestItinerary from './_components/quest-itinerary.svelte';
	export let data;
	const { quest } = data;
</script>

<div class="page">
	<div class="left">
		<br />
	</div>
	<div class="right">
		<div class="itinerary-container">
			<h2>Your Trip to {$questStore?.country}</h2>
			{#if quest}
				<QuestInfoBox quest={$questStore} />
			{/if}
			<QuestItinerary quest={$questStore} />
		</div>
	</div>
</div>

<style>
	:global(.app .main) {
		flex-direction: column;
		max-width: 100%;
	}
	.page {
		display: flex;
		flex-direction: row;
	}
	.page > div {
		flex-basis: 50%;
	}

	.right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 35px;
	}
	.itinerary-container {
		padding: 0 75px;
		width: 65%;
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 25px;
	}
	.itinerary-container h2 {
		font-family: Sora;
		font-weight: 700;
		font-size: 30px;
		color: white;
		text-align: center;
	}
</style>

<script lang="ts">
	import FullScreenLoader from '$lib/components/full-screen-loader.svelte';
	import { questStore } from '$lib/stores';
	import QuestChatbot from './_components/quest-chatbot.svelte';
	import QuestInfoBox from './_components/quest-info-box.svelte';
	import QuestItinerary from './_components/quest-itinerary.svelte';
	export let data;

	const { quest } = data;
</script>

<div class="page" class:hide={$questStore.itinerary === undefined}>
	<div class="left">
		<div class="itinerary-container">
			<h2>Your Trip to {$questStore?.country}</h2>
			{#if quest}
				<!-- <QuestInfoBox quest={$questStore} /> -->
			{/if}
			<QuestItinerary quest={$questStore} />
		</div>
	</div>
	<div class="right">
		<h2>Chat with Snowmate</h2>

		<QuestChatbot />
	</div>
</div>
<div class="loader" class:hide={$questStore.itinerary !== undefined}>
	<FullScreenLoader />
</div>

<style>
	:global(.app .main) {
		flex-direction: column;
		max-width: 100%;
	}

	.hide {
		display: none !important;
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
	h2 {
		font-family: Sora;
		font-weight: 700;
		font-size: 30px;
		color: white;
		text-align: center;
	}
</style>

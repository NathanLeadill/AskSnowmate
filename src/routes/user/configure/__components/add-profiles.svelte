<script lang="ts">
	import TagInput from '$lib/components/tag-input.svelte';
	export let hide = false;

	let addExternalTag: (activity: string) => void;
	let profiles: string[] = [];
</script>

<div class="page" class:hide>
	<p>
		Please create some profiles that you may want to reuse for different holidays you may want to
		book in the future. A few examples could be "Yearly Family Holiday", "Lads holiday", "Museums
		and Culture", "Romantic Retreat", "Eco-Adventurers" etc.
	</p>

	<TagInput bind:externalAddTag={addExternalTag} bind:tags={profiles} />
</div>

<style>
	.page {
		padding: 0 25px;
	}

	.page :global(.tags-container) {
		padding: 0;
	}

	:global(.tags-container .tag-input) {
		border: 1px solid black;
		border-width: 0 0 1px 0;
		padding: 10px;
	}
</style>

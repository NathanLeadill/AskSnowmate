<script lang="ts">
	import TagInput from '$lib/components/tag-input.svelte';
	export let hide = false;

	let addExternalTag: (activity: string) => void;
	let tags: string[] = [];

	// function addNewTag(activity: string) {
	// 	addExternalTag(activity);
	// }
</script>

<div class="page" class:hide>
	<p>
		Now it's time to tell us all the places that you've absolutely LOVED going to, this can be
		anything from the City of Prague, to the Eiffel Tower or Sognefjord in Norway. We'll use this
		list along with your chosen activities and interests to help us generate holidays suggestions
		for you and your friends.
	</p>

	<TagInput bind:externalAddTag={addExternalTag} bind:tags />
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

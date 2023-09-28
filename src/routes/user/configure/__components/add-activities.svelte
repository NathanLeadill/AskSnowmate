<script lang="ts">
	import TagInput from '$lib/components/tag-input.svelte';
	import { activities } from '$lib/options';

	export let hide = false;

	let addExternalTag: (activity: string) => void;
	let tags: string[] = [];

	function addNewTag(activity: string) {
		addExternalTag(activity);
	}
</script>

<div class="page" class:hide>
	<TagInput bind:externalAddTag={addExternalTag} bind:tags />

	<div class="tags-container">
		{#each activities as activity}
			<button
				class:hide={tags.includes(activity)}
				class="tag-button"
				type="button"
				on:click={() => {
					addNewTag(activity);
				}}>{activity}</button
			>
		{/each}
	</div>
</div>

<style>
	.tags-container {
		display: flex;
		margin-top: 20px;
		flex-wrap: wrap;
		max-width: fit-content;
		gap: 5px;
		padding: 0 10px;
	}
	.tag-button {
		padding: 10px;
		background: #f7f7f7;
		border: none;
		border-radius: 5px;
	}
	.tag-button:hover {
		cursor: pointer;
	}
	.hide {
		display: none;
	}

	:global(.tags-container .tag-input) {
		border: 0;
	}
</style>

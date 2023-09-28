<script lang="ts">
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	export let tags: string[] = ['tag'];
	let tagInput = '';

	export const externalAddTag = (tag: string) => {
		tags = [...tags, tag];
		tagInput = '';
	};

	function addTag(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			tags = [...tags, tagInput];
			tagInput = '';
		}
	}
	function removeTag(tag: string) {
		tags = tags.filter((item) => item !== tag);
	}
</script>

<div class="tags-container">
	{#each tags as tag, i (tag)}
		<div
			class="tag-item"
			animate:flip={{ duration: 1000 }}
			out:scale={{ duration: 250 }}
			in:scale={{ duration: 450 }}
		>
			<p>{tag}</p>
			<button
				class="delete-tag"
				on:click={() => {
					removeTag(tag);
				}}
			>
				<MdClose />
			</button>
		</div>
	{/each}
	<input type="text" name="tag-input" class="tag-input" bind:value={tagInput} on:keydown={addTag} />
	<input type="hidden" name="selected-tags" bind:value={tags} />
</div>

<style>
	.tags-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: white;
		padding: 5px 10px;
		column-gap: 10px;
		flex-wrap: wrap;
		row-gap: 20px;
	}
	/* 
	.tag-input {
		border: 0;
	} */
	.tag-input:focus {
		outline: none;
	}

	.tag-item {
		border: 1px solid #4fa7f4;
		background: #4fa7f4;
		font-family: Sora;
		color: white;
		font-weight: 800;
		padding: 4px 6px;
		border-radius: 5px;
		display: flex;
		align-items: center;
	}
	.tag-item p {
		margin: 0;
		white-space: nowrap;
		font-size: 14px;
		font-weight: 500;
	}

	.delete-tag {
		height: 20px;
		background: none;
		border: none;
		padding: 0 0 0 10px;
	}
	.delete-tag:hover {
		cursor: pointer;
	}
</style>

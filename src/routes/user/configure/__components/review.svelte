<script lang="ts">
	export let hide = false;
</script>

<div class="page" class:hide>
	<p>
		Please note, in the future we will show the information here before they click submit, but this
		week I've been focusing on the implementation of the API requests from ExperienceBank
	</p>
	<button type="submit">Submit</button>
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

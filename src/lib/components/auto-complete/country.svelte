<script lang="ts">
	export let itemLabel: string;
	export let highlighted: boolean;
</script>

<li class="autocomplete-items" class:autocomplete-active={highlighted}>
	<button on:click>
		{@html itemLabel}
	</button>
</li>

<style>
	li.autocomplete-items {
		list-style: none;
		border-bottom: 1px solid #d4d4d4;
		z-index: 99;
		top: 100%;
		left: 0;
		right: 0;
		padding: 10px;
		cursor: pointer;
		background-color: #fff;
		border: 0;
		width: 100%;
		padding: 0;
	}

	li.autocomplete-items:hover {
		background-color: #81921f;
		color: white;
		cursor: pointer;
	}

	li.autocomplete-items button {
		border: 0;
		width: 100%;
		padding: 15px 0px;
	}
</style>

<script lang="ts">
	let dateString: string;
</script>

<label>
	<input type="date" bind:value={dateString} />
</label>

{dateString}

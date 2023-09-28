<script lang="ts">
	async function run() {
		const test = await fetch('/api/auth/login');
		const data = await test.json();
		console.log(data);
	}
</script>

<button on:click={run}>test</button>

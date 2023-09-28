<script>
	let data;

	async function fetchActivities() {
		const res = await fetch('/api/activities', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		data = await res.json();
	}
</script>

<button on:click={fetchActivities}>Fetch Activities</button>

<pre>
	{JSON.stringify(data, null, 2)}
</pre>

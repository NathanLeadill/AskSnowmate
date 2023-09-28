<script>
	import Header from './Header.svelte';
	import './styles.css';
	export let data;
</script>

<div class="app">
	<Header {data} />

	<main class="main">
		<slot />
	</main>
	<footer>
		<p>
			Visit <a href="https://www.snowfalltravel.com">Snowfall Travel</a> to learn more about what we
			do
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		padding: 1rem;
		width: 100%;
		/* max-width: 64rem; */
		margin: 0 auto;
		box-sizing: border-box;
		/* justify-content: center; */
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
		font-family: Sora;
		word-spacing: 0.25rem;
	}

	footer a {
		font-family: Sora;
		font-weight: 600;
		color: white;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>

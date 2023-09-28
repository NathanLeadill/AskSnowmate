<script lang="ts">
	import { Map } from 'mapbox-gl';
	import { onMount, onDestroy } from 'svelte';

	let map;
	let mapContainer;
	let lng, lat, zoom;

	lng = -71.224518;
	lat = 42.213995;
	zoom = 9;

	onMount(() => {
		const initialState = { lng: lng, lat: lat, zoom: zoom };

		map = new Map({
			container: mapContainer,
			accessToken:
				'pk.eyJ1Ijoic2YtbmF0aGFuIiwiYSI6ImNsbWhuczJrcTAwNGoza3Ixa2ZrYWxpMm4ifQ.bOINpckIi4eYpJyb4DvqEw',
			style: `mapbox://styles/mapbox/outdoors-v11`,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});
	});
</script>

<div class="map-wrap">
	<div class="map" bind:this={mapContainer} />
</div>

<style>
	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>

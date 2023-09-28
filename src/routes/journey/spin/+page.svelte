<script lang="ts">
	import { Map } from 'mapbox-gl';
	import { onMount, onDestroy } from 'svelte';
	import * as turf from '@turf/turf';

	let map;
	let mapContainer;
	let lng, lat, zoom;

	// San Francisco
	const origin = [-122.414, 37.776];

	// Washington DC
	const destination = [-77.032, 38.913];

	// Coordinates are initially set to origin.
	const point = {
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'Point',
					coordinates: origin
				}
			}
		]
	};

	// A simple line from origin to destination.
	const route = {
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: [origin, destination]
				}
			}
		]
	};

	// Calculate the distance in kilometers between route start/end point.
	const lineDistance = turf.length(route.features[0]);

	const arc = [];

	// Number of steps to use in the arc and animation, more steps means
	// a smoother arc and animation, but too many steps will result in a
	// low frame rate
	const steps = 500;

	// Draw an arc between the `origin` & `destination` of the two points
	for (let i = 0; i < lineDistance; i += lineDistance / steps) {
		const segment = turf.along(route.features[0], i);
		arc.push(segment.geometry.coordinates);
	}

	// Update the route with calculated arc coordinates
	route.features[0].geometry.coordinates = arc;

	lng = -51.224518;
	lat = 32.213995;
	zoom = 1;

	onMount(() => {
		const initialState = { lng: lng, lat: lat, zoom: zoom };

		map = new Map({
			container: mapContainer,
			accessToken:
				'pk.eyJ1Ijoic2YtbmF0aGFuIiwiYSI6ImNsbWhuczJrcTAwNGoza3Ixa2ZrYWxpMm4ifQ.bOINpckIi4eYpJyb4DvqEw',
			// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [-1.5910988713488416, 53.860013930203884],
			zoom: 4
		});
		// Add line to map
		map.on('load', () => {
			map.addSource('route', {
				type: 'geojson',
				data: {
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'LineString',
						coordinates: [
							[-70.62450352833548, 43.88979086013892],
							[18.12765094377892, 59.16995251635184]
							// [-1.6067322624854108, 53.880576456899064],
							// [-1.5985147109818654, 53.874589944437865],
							// [-1.5931031524313646, 53.867538939318095],
							// [-1.5916333462398429, 53.865726757131],
							// [-1.5910988713488416, 53.860013930203884],
							// [-1.5910988713488416, 53.860013930203884],
							// [-1.5935405575044814, 53.8599]
							// [-1.5935405575044814, 53.85814308099361]
						]
					}
				}
			});
			map.addLayer({
				id: 'route',
				type: 'line',
				source: 'route',
				layout: {
					'line-join': 'round',
					'line-cap': 'round'
				},
				paint: {
					'line-color': '#888',
					'line-width': 4
				}
			});
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

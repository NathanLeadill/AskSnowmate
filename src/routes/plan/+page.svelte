<script lang="ts">
	import FaRocket from 'svelte-icons/fa/FaRocket.svelte';
	import FaCalendarAlt from 'svelte-icons/fa/FaCalendarAlt.svelte';
	import Swal from 'sweetalert2';
	import { goto } from '$app/navigation';
	import { questStore } from '$lib/stores';

	let destination = '';

	let panel = false;

	let departureDate = new Date().toDateString();
	let returnDate = new Date(new Date(departureDate).getTime() + 21 * 24 * 60 * 60 * 1000);

	function findQuest() {
		console.log('Find Quest');
		const dest = destination.split(',');
		// City coming soon
		console.log('Destination', dest, destination);
		questStore.update((store) => {
			store.country = dest[0];
			return store;
		});
		createOptions();
	}

	async function createOptions() {
		const steps = ['1', '2', '3'];
		const Queue = Swal.mixin({
			progressSteps: steps,
			confirmButtonText: 'Next >',
			// optional classes to avoid backdrop blinking between steps
			showClass: { backdrop: 'swal2-noanimation' },
			hideClass: { backdrop: 'swal2-noanimation' }
		});

		const { value: lengthOfStay } = await Queue.fire({
			title: 'How many nights is your quest going to last',
			inputLabel: 'Please select the number of nights you wish to travel for',
			currentProgressStep: 0,
			input: 'range',
			inputValue: 4,
			inputAttributes: {
				min: '1',
				max: '9',
				step: '1'
			},
			showClass: { backdrop: 'swal2-noanimation' }
		});
		questStore.update((store) => {
			store.lengthOfStay = lengthOfStay;
			return store;
		});

		await Queue.fire({
			title: 'How many people are going on this quest',
			text: 'Please select the number of people you wish to travel with',
			currentProgressStep: 1,
			input: 'number',
			inputValue: 2,
			inputAttributes: {
				min: '1',
				max: '10',
				step: '1'
			},
			inputValidator: (value) => {
				return new Promise((resolve) => {
					if (Number(value) > 10) {
						resolve('You can only travel with a maximum of 10 people');
					} else {
						resolve();
					}
				});
			}
		});
		console.log('QUEST', $questStore);

		await Queue.fire({
			title: 'What is your budget for this quest',
			text: 'Please enter the amount in GBP you wish to spend on this quest',
			currentProgressStep: 2,
			confirmButtonText: 'OK',
			input: 'number',
			inputValue: 1000,
			// optional class to show fade-out backdrop animation which was disabled in Queue mixin
			showClass: { backdrop: 'swal2-noanimation' }
		});

		goto(`/plan/quest/01023`);
	}

	function panelOpen() {
		panel = true;
	}

	function panelClose(key) {
		panel = false;
	}

	$: console.log(departureDate, 'DEPARURE DATE');

	$: if (departureDate < returnDate) {
		console.log('Departure date is before return date');
	} else {
		questStore.update((store) => {
			store.returnDate = returnDate;
			store.departureDate = departureDate;
			return store;
		});
	}

	$: console.log('QUEST STORE', $questStore);
</script>

<div class="travel-container">
	<div class="form">
		<h1 class="title">Ask Snowmate</h1>
		<p class="subtitle">Let's plan your next quest</p>
		<form>
			<input
				class="destination-input"
				type="text"
				placeholder="Where to"
				bind:value={destination}
			/>
			<button class="quest-submit" type="submit" on:click={findQuest}>
				<div class="icon">
					<FaRocket />
				</div>
			</button>
		</form>
		<div
			class="date-input"
			on:click={panelOpen}
			on:keypress={panelClose}
			aria-label="Select departure and return dates"
			role="button"
			tabindex="0"
		>
			<div class="cal-icon">
				<FaCalendarAlt />
			</div>
			<div class="date-label">
				<p>
					{new Date(departureDate).toLocaleDateString('en-us', {
						day: 'numeric',
						month: 'short',
						year: 'numeric'
					}) || 'Departure'}
				</p>
				<p class="dash">-</p>
				<p>
					{new Date(returnDate).toLocaleDateString('en-us', {
						day: 'numeric',
						month: 'short',
						year: 'numeric'
					})}
				</p>
			</div>
		</div>
	</div>
	<!-- MOVE TO COMPONENT NATHAN -->
	<div class="panel" class:active={panel}>
		<!-- {departureDate} -->

		<div class="panel-content">
			<button on:click={panelClose} class="close-button">Close panel</button>
			<p>There will be an infinite sliding calendar here when i can be bothered to make it :)</p>

			<p>Departure</p>
			<!-- Create date input bound to departureDate -->
			<input type="date" bind:value={departureDate} placeholder={departureDate} />

			<p>Return</p>
			<input type="date" bind:value={returnDate} />
		</div>
		<div class="selected-dates">
			<div class="departure-column">
				<p class="selected-label">Departure Date</p>
				<span class="selected-value"
					>{new Date(departureDate).toLocaleDateString('en-gb', {
						weekday: 'long',
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					})}</span
				>
			</div>
			<div class="return-column">
				<p class="selected-label">Return Date</p>
				<span class="selected-value"
					>{new Date(returnDate).toLocaleDateString('en-gb', {
						weekday: 'long',
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					})}</span
				>
			</div>
		</div>
	</div>
</div>

<style>
	:global(main.main) {
		justify-content: center;
	}
	.travel-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-family: Sora;
		font-weight: 700;
		margin-bottom: 0;
		letter-spacing: 2px;
		color: white;
	}

	.subtitle {
		font-family: Sora;
		font-weight: 400;
		font-size: 13px;
		line-height: 16px;
		color: white;
		text-align: center;
		margin: 5px 0 20px 0;
	}

	.destination-input {
		border-radius: 32px;
		border: none;
		padding: 12px 110px 12px 27px;
		font-family: Sora;
		width: 200px;
		height: 45px;
		font-size: 15px;
		line-height: 20px;
		font-weight: 500;
		letter-spacing: 0.05rem;
		color: #484848;
	}
	.destination-input::placeholder {
		color: #484848;
		line-height: 20px;
	}
	.destination-input:focus {
		outline: none;
	}
	form {
		position: relative;
	}
	.quest-submit {
		position: absolute;
		right: 5px;
		top: 4px;
		border-radius: 32px;
		border: none;
		font-family: Sora;
		width: 60px;
		height: 60px;
		font-size: 15px;
		line-height: 20px;
		font-weight: 400;
		color: black;
		background-color: #4fa7f4;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.quest-submit:hover {
		cursor: pointer;
	}

	.quest-submit .icon {
		width: 30px;
		height: 30px;
		color: white;
	}

	.date-input {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
	}

	.date-input:hover {
		cursor: pointer;
	}

	.cal-icon {
		width: 10px;
		height: 12px;
		color: white;
		margin-right: 10px;
		margin-bottom: 6px;
	}

	.date-input p {
		font-family: Sora;
		color: white;
		font-weight: 600;
	}

	.date-input p.dash {
		padding: 0 10px;
	}
	.date-label {
		display: flex;
		flex-direction: row;
	}

	/* Create a panel that slides up when it has active class */
	.panel {
		display: flex;
		flex-direction: column;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 650px;

		background: rgb(2, 0, 36);
		background: linear-gradient(0deg, #133c61 0%, #5096d3 30%);
		display: flex;
		justify-content: center;
		align-items: center;
		transition: 0.5s ease-in-out;
		transform: translateY(650px);
		border-top-left-radius: 5rem;
		border-top-right-radius: 5rem;
	}
	.panel.active {
		transform: translateY(0);
	}
	.panel-content {
		flex-grow: 1;
	}

	.selected-dates {
		height: 135px;
		background: #5096d3;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.selected-dates div {
		flex-basis: 50%;
		height: 100%;
	}

	.selected-dates div:first-of-type {
		border-right: 2px solid rgba(0, 0, 0, 0.389);
	}

	.selected-label {
		font-family: Sora;
		font-weight: 600;
		font-size: 1rem;
		letter-spacing: 0.075rem;
		line-height: 16px;
		color: white;
		margin: 25px 0 20px 10px;
	}
	.selected-value {
		color: white;
		font-family: Sora;
		font-size: 32px;
		font-weight: 700;
		margin: 25px 0 20px 25px;
	}
</style>

<script lang="ts">
	import FaDotCircle from 'svelte-icons/fa/FaDotCircle.svelte';
	import FaChevronCircleLeft from 'svelte-icons/fa/FaChevronCircleLeft.svelte';
	import FaChevronCircleRight from 'svelte-icons/fa/FaChevronCircleRight.svelte';
	import AddActivities from './__components/add-activities.svelte';
	import AddProfiles from './__components/add-profiles.svelte';
	import AddPlaces from './__components/add-places.svelte';
	import AddFamily from './__components/add-family.svelte';
	import Review from './__components/review.svelte';

	let activeStep = 1;
	export let data;
	export let form;

	function nextStep() {
		if (activeStep < 5) {
			console.log('FORM', form, data);

			activeStep++;
		}
	}

	function prevStep() {
		if (activeStep > 1) {
			activeStep--;
		}
	}

	function cancelEnter(event: KeyboardEvent) {
		const key = event.charCode || event.keyCode || 0;
		if (key === 13) {
			event.preventDefault();
		}
	}
</script>

<div class="page">
	<h2>Lets get started</h2>
	<pre>
		{JSON.stringify(form)}
	</pre>
	<p>
		It seems you haven't setup your initial config for your personal travel assistant. Let's go
		through some questions quickly now to improve our holiday suggestiosn for you.
	</p>

	{#if form?.success}
		<p>Successfully logged in! Welcome back, {data.name}</p>
	{/if}

	<div class="configure-first-time-container">
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<form method="POST" action="/user/configure" on:keydown|stopPropagation={cancelEnter}>
			<h6>Please add all the things you would enjoy doing on holiday</h6>
			<div class="configure-content">
				<AddActivities hide={activeStep !== 1} />
				<AddProfiles hide={activeStep !== 2} />
				<AddPlaces hide={activeStep !== 3} />
				<AddFamily hide={activeStep !== 4} />
				<Review hide={activeStep !== 5} />
			</div>

			<div class="configure-footer">
				<button class="left-button" on:click={prevStep}>
					<FaChevronCircleLeft />
				</button>
				{#each Array(activeStep) as _}
					<div class="step-button">
						<FaDotCircle />
					</div>
				{/each}
				{#each Array(5 - activeStep) as _}
					<div class="step-button step-button--inactive">
						<FaDotCircle />
					</div>
				{/each}
				<button class="right-button" type="button" on:click={nextStep}>
					<FaChevronCircleRight />
				</button>
			</div>
		</form>
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		font-family: Sora;
	}
	h6 {
		font-size: 1rem;
		text-align: center;
		margin: 0;
	}
	.configure-first-time-container {
		background-color: white;
		border-radius: 15px;
		height: 400px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 45px;
		max-width: 1280px;
	}
	.configure-content {
		border: 1px solid black;
		padding: 0;
		height: 300px;
	}
	.configure-footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 25px;
	}
	.step-button--inactive {
		opacity: 0.5;
	}
	.configure-footer :global(svg) {
		height: 30px;
	}

	.configure-footer :not(.step-button--inactive) :global(svg:hover) {
		cursor: pointer;
	}
	.right-button,
	.left-button {
		background: none;
		border: none;
	}
</style>

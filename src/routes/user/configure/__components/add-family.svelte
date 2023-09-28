<script lang="ts">
	import Swal from 'sweetalert2';
	export let hide = false;

	async function addPerson() {
		const steps = ['Name', 'Age', 'Relation'];
		const Queue = Swal.mixin({
			progressSteps: steps,
			confirmButtonText: 'Next >',
			// optional classes to avoid backdrop blinking between steps
			showClass: { backdrop: 'swal2-noanimation' },
			hideClass: { backdrop: 'swal2-noanimation' }
		});

		const { value: lengthOfStay } = await Queue.fire({
			title: 'Passenger Name',
			inputLabel: 'Please enter the full name of the passenger you wish to add',
			currentProgressStep: 0,
			input: 'text',
			showClass: { backdrop: 'swal2-noanimation' },
			allowOutsideClick: false,
			allowEscapeKey: false,
			inputValidator: (value) => {
				return new Promise((resolve) => {
					if (value.length < 3) {
						resolve('Please enter a name longer than 3 characters');
					} else {
						resolve();
					}
				});
			}
		});
		await Queue.fire({
			title: 'Age',
			text: 'Please enter the age of the passenger',
			currentProgressStep: 1,
			input: 'number',
			inputAttributes: {
				min: '0',
				max: '120',
				step: '1'
			},
			inputValidator: (value) => {
				return new Promise((resolve) => {
					if (Number(value) > 120) {
						resolve('Maximum age of 120');
					} else if (Number(value) < 0) {
						resolve('Minimum age of 0');
					} else {
						resolve();
					}
				});
			}
		});
		await Queue.fire({
			title: 'Relation',
			text: 'Please enter the relation of the passenger to the lead passenger',
			currentProgressStep: 2,
			input: 'select',
			inputOptions: {
				Wife: 'Wife',
				Husband: 'Husband',
				Child: 'Child',
				Parent: 'Parent',
				Grandparent: 'Grandparent',
				Grandchild: 'Grandchild',
				Friend: 'Friend',
				Other: 'Other'
			}
		});
	}
</script>

<div class="page" class:hide>
	<p>
		Please add people who you may wish to bring on holiday, you will be able to easily include each
		person in your future holiday planning!
	</p>
	<b>Passengers</b>
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Age</th>
				<th>Relation to Lead Passenger</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Betty Smith</td>
				<td>20</td>
				<td>Wife</td>
			</tr>
			<tr>
				<td>John Smith</td>
				<td>10</td>
				<td>Child</td>
			</tr>
			<tr>
				<td>Alice Smith</td>
				<td>5</td>
				<td>Child</td>
			</tr>
			<tr class="add-passenger-row">
				<td colspan="3">
					<button on:click={addPerson}>Add Passenger</button>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<style>
	table {
		width: 100%;
	}
	td {
		text-align: center;
	}
	.add-passenger-row {
		text-align: center;
	}

	:global(
			div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-progress-step
		) {
		border-radius: 0;
		padding: 0 15px;
		width: fit-content;
	}
</style>

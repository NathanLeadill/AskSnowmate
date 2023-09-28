<script lang="ts">
	export let data;
	export let form;
</script>

<div class="login-page">
	<h1>Login</h1>
	<form method="POST" action="/login">
		<div class="login-container">
			<div class="email-address form-item">
				<label for="email" class="form-label">Email</label>
				<input type="email" class="form-input" name="email" placeholder="Email" />
			</div>
			<div class="password form-item">
				<label for="password" class="form-label">Password</label>
				<input type="password" class="form-input" name="password" placeholder="Password" />
			</div>
		</div>
		<button type="submit">Log in</button>
	</form>
</div>

{#if form?.success}
	<!-- this message is ephemeral; it exists because the page was rendered in
           response to a form submission. it will vanish if the user reloads -->
	<p>Successfully logged in! Welcome back, {data}</p>
{/if}

<style>
	.login-page {
		margin: 0 auto;
	}
	.login-container {
		display: flex;
		flex-direction: column;
		border: 1px solid black;
		padding: 20px 30px;
		border-radius: 15px;
		row-gap: 15px;
	}

	.login-container > div {
		display: flex;
	}

	label {
		width: 100px;
	}
</style>

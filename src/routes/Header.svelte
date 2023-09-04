<script>
</script>

<header>
	<div class="brand">
		<a class="link" href="/">
			<img src="/images/logo.png" alt="Logo" />
		</a>
		<nav class="items">
			<a class="item dim" href="#home">
				<span>Home</span>
			</a>
			<a class="item dim" href="#about">
				<span>About</span>
			</a>
			<a class="item dim" href="/plan">
				<span>Plan</span>
			</a>
		</nav>
		<div class="user-section">
			<a class="item dim" href="/login">
				<span>Log in</span>
			</a>
			<a class="item dim" href="/signup">
				<span>Sign up</span>
			</a>
		</div>
		<!-- Create a dropdown -->
		<!-- <div class="dropdown">
			<button class="downdown-button">Dropdown</button>
			<div class="dropdown-content">
				<a href="/test">Link 1</a>
				<a href="#">Link 2</a>
				<a href="#">Link 3</a>
			</div>
		</div> -->
	</div>
</header>

<style>
	.brand {
		padding: 1rem 0;
		margin: 0.5rem;
		display: flex;
		justify-content: space-between;
		font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
		align-items: center;
	}
	img {
		height: inherit;
		width: 60px;
	}
	.items {
		font-size: 1rem;
		font-family: Sora;
		font-weight: 700;
	}
	.item {
		padding: 0.5rem;
		color: white;
		text-decoration: none;
		text-transform: uppercase;
	}
	.dim {
		transition: color 0.15s ease-in;
	}
	.dim:focus,
	.dim:hover {
		color: hsla(100, 45%, 6%, 0.5);
	}

	@media (max-width: 768px) {
		.brand {
			flex-direction: column;
			align-items: center;
		}
		.items {
			margin-top: 1rem;
		}
	}
</style>

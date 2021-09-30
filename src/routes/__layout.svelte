<svelte:head>
	<title>Acessaê!</title>
</svelte:head>
<slot />

<style lang="scss">
	:global(html, body, #svelte) {
		font-family: Helvetica, sans-serif;
		width: 100%;
		height: 100%;
		margin: 0;
	}

	:global(*, *::after, *::before) {
		box-sizing: border-box;
	}

	:global(:root) {
		--card-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
		--primary-color: #f7c945;
		--range-slider: black;
		--range-handle-inactive: black; /* inactive handle color */
		--range-handle-focus: black; /* non-focussed handle color */
	}
</style>

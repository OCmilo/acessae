<script lang="ts">
	let disabled: Boolean;
</script>

<button {disabled} type="button" class="submit-button" on:click|preventDefault> Verificar! </button>

<style lang="scss">
	.submit-button {
		display: block;
		padding: 1rem 2rem;
		margin-left: auto;
		margin-right: auto;
		margin-top: 1.5rem;
		border: 1px solid var(--primary-color);
		border-radius: 0.5rem;
		background-color: var(--primary-color);
		font-weight: 600;
		font-size: 1rem;
		color: black;
		cursor: pointer;
		transition: all 0.1s;

		&:hover {
			background-color: white;
			border: 1px solid black;
		}

		&:active {
			background-color: black;
			color: white;
		}

		&:focus {
			outline: none;
		}

		&:disabled {
			background-color: lightgray;
			border: 1px solid lightgray;
			cursor: not-allowed;
		}
	}
</style>

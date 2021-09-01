<script lang="ts">
	import { goto } from '$app/navigation';

	const serverUrl = 'http://localhost:3001';

	let inputValue = '';

	const validateInput = (text: string) =>
		inputValue &&
		/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(
			text
		);

	$: isInputValid = validateInput(inputValue);

	const submit = async () => {
		if (isInputValid) {
			await goto(`/results/${encodeURIComponent(inputValue)}`);
		}
	};
</script>

<main id="wrapper">
	<h1 class="title">Acessaê!</h1>
	<div class="card">
		<h4 class="description">Insira um link e verifique a nota de performance do seu site.</h4>
		<input
			type="text"
			id="text-input"
			placeholder="Link a validar"
			class:error={inputValue && !isInputValid}
			class:valid={isInputValid}
			bind:value={inputValue}
			autofocus
		/>
		<small role="alert" class="alert" class:alerted={inputValue && !isInputValid}>
			Por favor, insira um link válido
		</small>
		<button
			disabled={!isInputValid}
			type="button"
			class="submit-button"
			on:click|preventDefault={submit}
		>
			Verificar!
		</button>
	</div>
</main>

<style lang="scss">
	.error {
		border: 2px solid darkred;

		&:focus {
			border: 2px solid darkred !important;
		}
	}

	.valid {
		border: 2px solid green;

		&:focus {
			border: 2px solid green !important;
		}
	}

	.card {
		background-color: white;
		padding: 2rem 4rem;
		border-radius: 2rem;
		box-shadow: var(--card-shadow);
	}

	.title {
		color: white;
		background-color: black;
		padding: 1rem;
		border-radius: 1rem;
		font-size: 5rem;
		box-shadow: var(--card-shadow);
		margin-bottom: 4rem;
	}

	.description {
		font-size: 1.1rem;
	}

	.alert {
		color: darkred;
		padding-left: 0.5rem;
		visibility: hidden;
	}

	.alerted {
		visibility: visible;
	}

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

	#wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: var(--primary-color);
	}

	#text-input {
		width: 100%;
		font-size: 1.5rem;
		border-radius: 0.5rem;
		border-style: solid;
		padding: 0.5rem 1rem;

		&:focus {
			outline: 1px solid white;
			border-color: black;
		}
	}
</style>

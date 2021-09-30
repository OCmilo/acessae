<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Wave } from 'svelte-loading-spinners';
	import RangeSlider from 'svelte-range-slider-pips';
	import { getUri, postRating } from '../../services';
	import responseMock from '../../mocks/response.json';
	import type { AccessibilityResponse } from '../../services';

	enum PageState {
		loading,
		error,
		done
	}

	// const pageId = $page.params.id;
	let siteState: PageState = PageState.loading;
	let data: AccessibilityResponse | null = null;
	let values = [5];

	onMount(() => {
		// TODO remove mock
		// getUri(encodeURIComponent(pageId)).then((res) => {
		// 	if (res instanceof Error) {
		// 		siteState = 'error';
		// 		return;
		// 	}

		// 	data = res;
		// 	siteState = 'done';
		// });
		data = responseMock;
		siteState = PageState.done;
	});

	const submitRating = async () => {
		try {
			await postRating(data._id, values[0]);
		} catch (_) {
			siteState = PageState.error;
		}
	};
</script>

<main id="wrapper">
	<div class="card">
		{#if siteState === PageState.loading}
			<h1>Processando seu link...</h1>
			<Wave color="#000000" size="100" />
			<h4 class="loading-subtext">
				Se o link nunca foi processado, este processo pode durar por volta de 1 minuto
			</h4>
		{:else if siteState === PageState.error}
			<h1>There was an error</h1>
		{:else if siteState === PageState.done}
			<h1>
				<a class="header-link" href={data.url} target="_blank" rel="noopener noreferrer">
					{data.url}&nearr;
				</a>
			</h1>
			<div class="scores">
				<div class="score-wrapper">
					<h3>SCORE</h3>
					<p class="score-number">{data.accessibility}</p>
				</div>
				<div class="score-wrapper score-padding">
					<h3>USER SCORE</h3>
					<p class="score-number">{data.user_score}</p>
				</div>
			</div>
			<div class="range-container">
				<h2 class="rating-header">Deixe sua avaliação do site aqui :)</h2>
				<RangeSlider id="rating-range" bind:values pips min={0} max={100} step={10} all="label" />
				<button type="button" class="rating-button" on:click|preventDefault={submitRating}>
					Enviar!
				</button>
			</div>
			<h5>Número de vezes que este link foi buscado: {data.searches}</h5>
		{/if}
	</div>
</main>

<style lang="scss">
	#wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: black;
	}

	.card {
		background-color: var(--primary-color);
		width: 50%;
		padding: 2rem 8rem;
		border-radius: 2rem;
		box-shadow: var(--card-shadow);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition: all 0.5s;
	}

	.scores {
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin-top: 2rem;
	}

	.range-container {
		width: 100%;
		margin-top: 5rem;
		margin-bottom: 3rem;
		padding: 0 3rem;
	}

	.rating-header {
		text-align: center;
		margin-bottom: 2.5rem;
	}

	.rating-button {
		display: block;
		padding: 1rem 2rem;
		margin-left: auto;
		margin-right: auto;
		margin-top: 4.5rem;
		border: 1px solid black;
		border-radius: 0.5rem;
		background-color: black;
		font-weight: 600;
		font-size: 1rem;
		color: white;
		cursor: pointer;
		transition: all 0.1s;

		&:hover {
			background-color: black;
			color: var(--primary-color);
		}

		&:active {
			background-color: var(--primary-color);
			color: black;
			border: 1px solid black;
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

	.score-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.score-number {
		margin: 0;
		font-size: 3rem;
		font-weight: bold;
	}

	.loading-subtext {
		text-align: center;
	}

	.header-link {
		&:link,
		&:visited {
			color: black;
			text-decoration: none;
		}

		&:hover {
			color: blue;
		}
	}
</style>

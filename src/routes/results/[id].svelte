<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Wave } from 'svelte-loading-spinners';
	import { getUri } from '../../services';
	import type { AccessibilityResponse } from '../../services';

	const pageId = $page.params.id;
	let siteState = 'loading';
	let data: AccessibilityResponse | null = null;

	onMount(() => {
		getUri(encodeURIComponent(pageId)).then((res) => {
			console.log(res);
			if (res instanceof Error) {
				siteState = 'error';
				return;
			}

			data = res;
			siteState = 'done';
		});
	});
</script>

<main id="wrapper">
	<div class="card">
		{#if siteState === 'loading'}
			<h1>Processando seu link...</h1>
			<Wave color="#000000" size="100" />
			<h4 class="loading-subtext">
				Se o link nunca foi processado, este processo pode durar por volta de 1 minuto
			</h4>
		{:else if siteState === 'error'}
			<h1>There was an error</h1>
		{:else if siteState === 'done'}
			<h1>{data.url}</h1>
			<div class="scores">
				<div class="score-wrapper">
					<h3>SCORE</h3>
					<p class="score-number">{data.accessibility}</p>
				</div>
				<div class="score-wrapper score-padding">
					<h3>USER SCORE</h3>
					<p class="score-number">TBD</p>
				</div>
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
</style>

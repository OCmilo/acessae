<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Wave } from 'svelte-loading-spinners';
	import RangeSlider from 'svelte-range-slider-pips';
	import Comment from '../../components/Comment.svelte';
	import { getUri, postFeedback } from '../../services';
	import type { AccessibilityResponse } from '../../entities';

	enum PageState {
		loading,
		error,
		done
	}

	const rangeSlideStarterValue = 50;
	const pageId = $page.params.id;

	let siteState: PageState = PageState.loading;
	let data: AccessibilityResponse | null = null;
	let name: string = '';
	let comment: string = '';
	let values = [rangeSlideStarterValue];
	let feedbackSent = false;

	onMount(() => {
		getUri(encodeURIComponent(pageId)).then((res) => {
			if (res instanceof Error) {
				siteState = PageState.error;
				return;
			}

			if (res.user_score !== 'S/N') {
				const sumOfRatings = res.comments.reduce(
					(prev, curr) => (prev += Number(curr.user_score)),
					0
				);
				res['user_score'] = (sumOfRatings / res.comments.length).toString();
			}

			data = res;
			siteState = PageState.done;
		});
	});

	// TODO submit comment
	const submitFeedback = async () => {
		try {
			await postFeedback(data.url, name, comment, values[0]);
			feedbackSent = true;
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
					<p class="score-number">{data.a11y_score}</p>
				</div>
				<div class="score-wrapper score-padding">
					<h3>USER SCORE</h3>
					<p class="score-number">{data.user_score}</p>
				</div>
			</div>
			<div class="feedback-container">
				<h2 class="rating-header">Deixe seu feedback do site aqui :)</h2>
				<label for="name" class="label">Nome*:</label>
				<input
					id="name"
					class="name"
					type="text"
					maxlength="40"
					placeholder="Nome"
					bind:value={name}
					required
				/>
				<label for="comment" class="label">Comentário:</label>
				<textarea
					id="comment"
					rows="8"
					cols="60"
					maxlength="549"
					class="comment-area"
					placeholder="Deixe seu comentário (opcional)"
					bind:value={comment}
				/>
				<div class="range-container">
					<RangeSlider id="rating-range" bind:values pips min={0} max={100} step={10} all="label" />
				</div>
				{#if feedbackSent}
					<h4 role="alert" class="feedback-alert">Feedback enviado!</h4>
				{:else}
					<button type="button" class="rating-button" on:click|preventDefault={submitFeedback}>
						Enviar!
					</button>
				{/if}
			</div>
			<small>Número de vezes que este link foi buscado: {data.hits}</small>
		{/if}
	</div>
	{#if siteState === PageState.done && data.comments.length > 0}
		<div class="card comment-card">
			<h2>COMENTÁRIOS</h2>
			{#each data.comments as { name, body, user_score }}
				<Comment {name} {body} {user_score} />
			{/each}
		</div>
	{/if}
</main>

<style lang="scss">
	#wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: stretch;
		padding: 3rem 0;
		background-color: black;
	}

	.card {
		background-color: var(--primary-color);
		padding: 2rem 7rem;
		border-radius: 2rem;
		box-shadow: var(--card-shadow);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition: all 0.5s;
		overflow: auto;
	}

	.comment-card {
		margin-left: 1rem;
		padding: 2rem;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.feedback-alert {
		text-align: center;
	}

	.label {
		margin-left: 4px;
		font-weight: 600;
		margin-bottom: 3px;
	}

	.scores {
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin-bottom: 1rem;
	}

	.feedback-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 2rem;
	}

	.name {
		margin-bottom: 1rem;
		padding: 0.8rem 1rem;
		width: 20rem;
		border: 2px solid black;
		border-radius: 0.3rem;

		&:focus {
			outline: none;
		}
	}

	.range-container {
		width: 100%;
		margin-bottom: 2rem;
	}

	.rating-header {
		margin-bottom: 1.5rem;
	}

	.comment-area {
		padding: 1rem;
		margin-bottom: 2rem;
		border: 2px solid black;
		border-radius: 0.5rem;
		resize: none;

		&:focus {
			outline: none;
		}
	}

	.rating-button {
		display: block;
		padding: 1rem 2rem;
		margin-left: auto;
		margin-right: auto;
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

<script lang="ts">
	export let name: string;
	export let body: string;
	export let rating: number | undefined;
</script>

<div class="wrapper">
	<div class="inner-wrapper">
		<div class="description">
			<h4 class="name">{name}</h4>
			{#if rating}
				<h4 class="rating">Nota: {rating}</h4>
			{/if}
		</div>
		<p class="body">{body}</p>
	</div>
</div>

<style lang="scss">
	.wrapper {
		width: 20rem;
		border: 2px solid black;
		border-radius: 0.5rem;
		padding: 0 0.8rem;
		word-wrap: break-word;

		&:not(&:last-child) {
			margin-bottom: 1rem;
		}
	}

	.inner-wrapper {
		margin-left: 0.5rem;
	}

	.description {
		display: flex;
		justify-content: space-between;
	}

	.name {
		margin: 1.5rem 0 0.5rem 0;
	}

	.body {
		margin: 0.5rem 0 1.5rem 0;
	}
</style>

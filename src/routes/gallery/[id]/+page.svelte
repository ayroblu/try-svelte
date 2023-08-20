<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { viewTransition, willUnmountViewTransition } from '$lib/animate-tracker-action';
	import { onDestroy } from 'svelte';

	const id = $page.params.id;
	const url = `https://picsum.photos/seed/id-${id}/800/400`;
	let node: HTMLElement | undefined;
	onDestroy(() => {
		if (node) {
			willUnmountViewTransition(node, id);
		}
	});
</script>

<div class="modal">
	<a href="{base}/gallery">
		<svg viewBox="0 0 24 24" height="1em" width="1em">
			<path fill="none" stroke="currentColor" stroke-width="2" d="M3,3 L21,21 M3,21 L21,3" />
		</svg>
	</a>
	<div use:viewTransition={id} bind:this={node}>
		<img src={url} alt="picsum" />
	</div>
</div>

<style>
	a {
		color: inherit;
	}
	img {
		width: 100%;
	}
	.modal {
		position: fixed;
		inset: 0;
		background: black;
	}
</style>

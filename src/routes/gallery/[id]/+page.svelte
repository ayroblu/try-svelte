<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { viewTransition, willUnmountViewTransition } from '$lib/animate-tracker-action';
	import { onDestroy, onMount } from 'svelte';

	const id = $page.params.id;
	const url = `https://picsum.photos/seed/id-${id}/800/400`;
	let node: HTMLElement | undefined;
	onDestroy(() => {
		if (node) {
			willUnmountViewTransition(node, id);
		}
	});
	/* onMount(() => { */
	/* 	document.body.style.position = 'fixed'; */
	/* 	document.body.style.top = `-${window.scrollY}px`; */
	/* }); */
	/* onDestroy(() => { */
	/* 	const scrollY = document.body.style.top; */
	/* 	document.body.style.position = ''; */
	/* 	document.body.style.top = ''; */
	/* 	window.scrollTo(0, parseInt(scrollY || '0') * -1); */
	/* }); */
</script>

<a href="{base}/gallery" class="modal">
	<a href="{base}/gallery">
		<svg viewBox="0 0 24 24" height="1em" width="1em">
			<path fill="none" stroke="currentColor" stroke-width="2" d="M3,3 L21,21 M3,21 L21,3" />
		</svg>
	</a>
	<div use:viewTransition={id} bind:this={node}>
		<img src={url} alt="picsum" />
	</div>
</a>

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

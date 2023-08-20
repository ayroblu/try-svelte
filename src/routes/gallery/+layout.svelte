<script>
	import { base } from '$app/paths';
	import { afterNavigate, disableScrollHandling } from '$app/navigation';
	import AnimateLayout from '$lib/animate-layout.svelte';

	const items = Array(100)
		.fill(null)
		.map((_, i) => ({ url: `https://picsum.photos/seed/id-${i}/800/400`, id: i.toString() }));

	afterNavigate(() => {
		disableScrollHandling();
	});
</script>

<h1>Gallery</h1>
<div class="container">
	{#each items as item}
		<AnimateLayout let:animate>
			<a use:animate={item.id} href="{base}/gallery/{item.id}" class="imageContainer">
				<img src={item.url} alt="lorem picsum" />
			</a>
		</AnimateLayout>
	{/each}
</div>
<slot />

<style>
	.imageContainer {
		aspect-ratio: 1 / 1;
	}
	.container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}
	img {
		width: 100%;
		object-fit: cover;
		aspect-ratio: 1 / 1;
		/* https://stackoverflow.com/questions/5804256/image-inside-div-has-extra-space-below-the-image */
		display: block;
	}
</style>

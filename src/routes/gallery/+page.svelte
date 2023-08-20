<script>
	const items = Array(100)
		.fill(null)
		.map((_, i) => `https://picsum.photos/seed/id-${i}/800/600`);
</script>

<h1>Gallery</h1>
<div class="container">
	{#each items as item}
		<div class="image"><img src={item} alt="lorem picsum" /></div>
	{/each}
</div>

<style>
	.image {
		aspect-ratio: 1 / 1;
	}
	.container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
	img {
		width: 100%;
		object-fit: cover;
		aspect-ratio: 1 / 1;
		/* https://stackoverflow.com/questions/5804256/image-inside-div-has-extra-space-below-the-image */
		display: block;
	}
</style>

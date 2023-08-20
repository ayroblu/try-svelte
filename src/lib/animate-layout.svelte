<script lang="ts">
	/* import { onDestroy } from 'svelte'; */
	import { setupViewTransition, willUnmountViewTransition } from './animate-tracker-action';

	/* let params: { node: HTMLElement; key: string } | undefined; */

	/* onDestroy(() => { */
	/* 	if (params) { */
	/* 		const { node, key } = params; */
	/* 		willUnmountViewTransition(node, key); */
	/* 	} */
	/* }); */

	function handleTransition(node: HTMLElement, key: string) {
		setupViewTransition(node, key);
		return {
			destroy: () => {
				willUnmountViewTransition(node, key);
			}
		};
		/* params = { node, key }; */
	}
</script>

<slot animate={handleTransition} />

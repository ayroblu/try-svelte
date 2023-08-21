import type { Action } from 'svelte/action';

const nodes = new Map<string, HTMLElement[]>();

export function viewTransition(node: Parameters<Action>[0], key: string): ReturnType<Action> {
	setupViewTransition(node, key);
	return {
		destroy: () => {
			willUnmountViewTransition(node, key);
		}
	};
}

export function setupViewTransition(node: HTMLElement, key: string) {
	const savedNodes = nodes.get(key);
	if (savedNodes) {
		const lastNode = savedNodes.at(-1);
		if (lastNode) {
			performAnimationBetweenNodes(lastNode, node);
		}

		savedNodes.push(node);
	} else {
		nodes.set(key, [node]);
	}
}
export function willUnmountViewTransition(node: HTMLElement, key: string) {
	const savedNodes = nodes.get(key);
	if (!savedNodes) {
		return;
	}
	const remainingNodes = savedNodes.filter((n) => n !== node);
	if (remainingNodes.length === savedNodes.length) {
		return;
	}

	if (remainingNodes.length >= 1) {
		const currentNode = remainingNodes.at(-1);
		if (currentNode) {
			performAnimationBetweenNodes(node, currentNode);
		}
		nodes.set(key, remainingNodes);
	} else {
		nodes.delete(key);
	}
}

function performAnimationBetweenNodes(previousNode: HTMLElement, node: HTMLElement) {
	if (!document.body.contains(previousNode)) {
		console.log('previous node not found in dom', previousNode);
		return;
	}
	if (!document.body.contains(node)) {
		console.log('node not found in dom', node);
		return;
	}
	const previousRect = previousNode.getBoundingClientRect();
	const currentRect = node.getBoundingClientRect();
	const scaleValue = previousRect.height / currentRect.height;
	const offsetX = (previousRect.width - currentRect.width * scaleValue) / 2;
	const offsetY = (previousRect.height - currentRect.height * scaleValue) / 2;
	const x = previousRect.left - currentRect.left + offsetX;
	const y = previousRect.top - currentRect.top + offsetY;
	node.style.transform = `translate(${x}px, ${y}px) translateZ(0) scale(${scaleValue})`;
	node.style.transformOrigin = `top left`;
	node.style.transition = '';
	node.style.zIndex = '1';

	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			node.style.transition = 'transform 250ms';
			node.style.transform = 'translate(0) scale(1)';
			node.addEventListener(
				'transitionend',
				() => {
					node.style.transform = '';
					node.style.transformOrigin = '';
					node.style.transition = '';
					node.style.zIndex = '';
				},
				{ once: true }
			);
		});
	});
}

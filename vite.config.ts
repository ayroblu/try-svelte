import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			// registerType: "autoUpdate",
			manifest: {
				name: 'Try Svelte',
				short_name: 'Try Svelte',
				theme_color: '#323232',
				background_color: '#323232',
				icons: [
					{
						src: 'favicons/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'favicons/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			},
			// workbox: {
			//   navigateFallback: null,
			// },
			filename: 'sw.ts',
			srcDir: 'src/service-worker',
			strategies: 'injectManifest'
			// uses add event listener load - more complexity?
			// injectRegister: "inline",
			// devOptions: {
			//   enabled: true,
			//   type: "module",
			// },
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

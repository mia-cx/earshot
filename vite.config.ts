import { withSvartzHost } from '@svartz/vite/host';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

// `svartz dev` and `svartz build` index the course vault (svartz.config.ts) before SvelteKit builds.
export default withSvartzHost(
	defineConfig({
		resolve: {
			alias: {
				// The vault's index alone. `virtual:svartz/host` would also bundle Svartz's page runtime,
				// which imports `base` from `$app/paths`, gone in SvelteKit 3; the course renders its own pages.
				'virtual:course-index': `${import.meta.dirname}/.svartz/vaults/course/artifacts/index.ts`
			}
		},
		plugins: [
			tailwindcss(),
			sveltekit({
				compilerOptions: {
					// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
					runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
				},
				// `pnpm dev` plays narration from the real bucket; builds and tests use a local, empty one, so
				// they need no Cloudflare login.
				adapter: adapter({ platformProxy: { remoteBindings: process.env.npm_lifecycle_event === 'dev' } }),
				// Every page's CSS goes in its HTML, so the first page paints without waiting on stylesheets.
				// Later pages load client-side and fetch their CSS as files.
				inlineStyleThreshold: Infinity,
				// The public origin, for canonical URLs, the sitemap and robots.txt in prerendered pages.
				// `pnpm build` fails without it; see the sitemap route.
				paths: { origin: process.env.SITE_URL }
			})
		],
		test: {
			expect: { requireAssertions: true },
			projects: [
				{
					extends: './vite.config.ts',
					test: {
						name: 'server',
						environment: 'node',
						include: ['{src,scripts}/**/*.{test,spec}.{js,ts}'],
						exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
					}
				}
			]
		}
	})
);

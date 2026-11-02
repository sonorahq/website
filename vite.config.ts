import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// in development `/api` goes to `wrangler dev`, which runs the worker on its default port
	server: { proxy: { '/api': 'http://localhost:8787' } }
});

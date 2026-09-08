import adapter from '@sveltejs/adapter-static';

const base = process.env.BASE_PATH ?? '';

export default {
	kit: {
		adapter: adapter(),
		paths: { base: base === '/' ? '' : base }
	}
};

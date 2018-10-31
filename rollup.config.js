import pkg from './package.json';

export default {
	input: 'src/index.js',
	external: Object.keys(pkg.dependencies).concat(
		// Node standard modules
		['path']
	),
	output: {
		format: 'cjs',
		file: pkg.main
	}
};

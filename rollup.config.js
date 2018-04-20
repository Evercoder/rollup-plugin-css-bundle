import pkg from './package.json';

export default {
	input: 'src/index.js',
	output: {
		format: 'cjs',
		file: pkg.main,
		external: Object.keys(pkg.dependencies)
	}
}
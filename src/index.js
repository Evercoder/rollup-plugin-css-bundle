import fs from 'fs-extra';
import path from 'path';
import utils from 'rollup-pluginutils';

export default opts => {
	let styles = {};

	const options = Object.assign(
		{
			include: ['**/*.css'],
			transform: code => code
		},
		opts
	);

	const filter = utils.createFilter(options.include, options.exclude);

	return {
		name: 'cssbundle',

		async load(id) {
			if (!filter(id)) return;
			return await fs.readFile(id, 'utf8');
		},

		async transform(code, id) {
			if (!filter(id)) return;
			styles[id] = await options.transform(code);
			return '';
		},

		generateBundle(opts, bundle) {
			for (const file in bundle) {
				// Depending on the Rollup version,
				// the `modules` will be either an array
				// or an object with key-value pairs.
				let modules = Array.isArray(bundle[file].modules)
					? bundle[file].modules
					: Object.getOwnPropertyNames(bundle[file].modules);
				let css = Object.entries(styles)
					.sort((a, b) => modules.indexOf(a[0]) - modules.indexOf(b[0]))
					.map(entry => entry[1])
					.join('\n');

				fs.outputFile(
					options.output ||
					path.join(
						path.dirname(opts.file),
						path.basename(file, path.extname(opts.file)) + '.css'
					),
					css
				);
			}
		}
	};
};

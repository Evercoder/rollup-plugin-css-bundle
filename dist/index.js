'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs-extra'));
var path = _interopDefault(require('path'));
var utils = _interopDefault(require('rollup-pluginutils'));

var index = (opts) => {

	let styles = {};
	let bundles = {};

	const options = Object.assign({
		include: ['**/*.css'],
		transform: code => code
	}, opts);

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

		ongenerate(opts, bundle) {
			let css = Object.entries(styles)
				.sort((a, b) => bundle.modules.indexOf(a[0]) - bundle.modules.indexOf(b[0]))
				.map(entry => entry[1])
				.join('\n');
			bundles[opts.file] = css;
		},

		onwrite(opts) {
			fs.outputFile(
				options.output || 
				path.join(
					path.dirname(opts.file), 
					path.basename(opts.file, path.extname(opts.file)) + '.css'
				),
				bundles[opts.file]
			);
		}
	}
}

module.exports = index;

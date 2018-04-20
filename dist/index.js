'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
require('postcss');
var fs = _interopDefault(require('fs'));

var index = (opts) => {

	let styles = {};
	let bundles = {};

	const options = Object.assign({
		include: ['**/*.css']
	}, opts);

	const filter = rollupPluginutils.createFilter(options.include, options.exclude);

	return {
		name: 'cssbundle',

		async load(id) {
			if (!filter(id)) return;
			return await fs.readFile(id, 'utf8');
		},

		transform(code, id) {
			if (!filter(id)) return;
			styles[id] = code;
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
			let dest = options.file || opts.file.replace(/\.js$/, '.css');
			fs.writeFile(dest, bundles[opts.file]);
		}
	}
}

module.exports = index;

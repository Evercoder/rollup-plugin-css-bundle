# rollup-plugin-css-bundle

A [Rollup](https://github.com/rollup/rollup) plugin whose sole purpose is to collect all the CSS files you import into your project and bundle them into a single glorious CSS file.

## Usage

```js
// rollup.config.js
import cssbundle from 'rollup-plugin-css-bundle';

export default {
	input: 'index.js',
	output: {
		file: 'dist/index.js',
		format: 'cjs'
	},
	plugins: {
		cssbundle()
	}
}
```

## Options

Like all well-behaved Rollup plugins, `cssbundle` supports the `include` and `exclude` options that let you configure on which files the plugin should run. Additionally:

__output__: _String_ is an optional path wherein to put the extracted CSS; when ommitted, we use the bundle's filename to fashion a name for the bundled CSS.

__transform__: _Function_ is available for processing the CSS, such as with [postcss](https://github.com/postcss/postcss). It receives a string containing the code to process as its only parameter, and should return the processed code:

```js
// rollup.config.js

import cssbundle from 'rollup-plugin-css-bundle';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

export default {
	input: 'index.js',
	output: {
		file: 'dist/index.js',
		format: 'cjs'
	},
	plugins: [
		cssbundle({
			transform: code => postcss([autoprefixer]).process(code, {})
		})
	]
};
```

That's it. Enjoy! ✌️

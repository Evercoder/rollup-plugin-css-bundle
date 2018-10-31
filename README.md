# rollup-plugin-css-bundle

A [Rollup](https://github.com/rollup/rollup) plugin whose sole purpose is to collect all the CSS files you import into your project and bundle them into a single glorious CSS file. Refreshingly, it preserves the order in which the CSS files are imported. Soberingly, it does not generate source maps.

## Installation

<a href="https://www.npmjs.org/package/rollup-plugin-css-bundle"><img src="https://img.shields.io/npm/v/rollup-plugin-css-bundle.svg?style=flat" alt="npm version"></a>

```bash
# using npm
npm install --save-dev rollup-plugin-css-bundle

# using yarn
yarn add --dev rollup-plugin-css-bundle
```

## Usage

In your **rollup.config.js** file:

```js
import cssbundle from 'rollup-plugin-css-bundle';

export default {
	input: 'index.js',
	output: {
		file: 'dist/index.js',
		format: 'cjs'
	},
	plugins: [cssbundle()]
};
```

Like all well-behaved Rollup plugins, cssbundle supports the **include** and **exclude** options that filter the files on which the plugin should run.

**output**: _String_ is an optional path for the extracted CSS; when ommitted, we use the bundle's file name to fashion a path for the bundled CSS.

**transform**: _Function_ is available for processing the CSS, such as with [postcss](https://github.com/postcss/postcss). It receives a string containing the code to process as its only parameter, and should return the processed code. _Par exemple_:

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

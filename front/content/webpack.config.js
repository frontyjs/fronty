const { resolve } = require('path');
const HtmlPlugin = require('html-webpack-plugin');

const context = resolve(__dirname, 'src');

module.exports = {
	entry: {
		app: ['./']
	},

	output: {
		publicPath: '/content/'
	},

	context,

	plugins: [
		new HtmlPlugin({
			title: 'Content'
		})
	]
};

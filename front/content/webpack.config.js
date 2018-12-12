const { resolve } = require('path');
const HtmlPlugin = require('html-webpack-plugin');

const context = resolve(__dirname, 'src');

module.exports = {
	entry: {
		app: ['./']
	},

	output: {
		publicPath: '/content'
	},

	context,

	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}]
	},

	plugins: [
		new HtmlPlugin({
			title: 'Content',
			viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
			template: 'index.html'
		})
	]
};

const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},

	plugins: [new HtmlPlugin({ title: 'Fronty App To App Communication' })],
};

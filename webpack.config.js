/* eslint-disable no-undef */
const glob = require('glob');
const path = require('path');
// const webpack = require('webpack');

//получаем точки входа и преобразуем их в объект
const entryPoints = glob.sync(app.pathes.src.js).reduce(function (prev, item) {
	prev[path.basename(item, '.js')] = item;
	return prev;
}, {});

module.exports = {
	mode: app.isBuild ? 'production' : 'development',
	entry: entryPoints,
	output: {
		path: path.resolve(__dirname, app.pathes.build.js),
		filename: `[name].js`,
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									targets: 'defaults',
								},
							],
						],
					},
				},
			},
		],
	},
	devtool: !app.isBuild ? 'source-map' : false,
	optimization: {
		usedExports: app.isBuild,
		minimize: app.isBuild,
	},
};

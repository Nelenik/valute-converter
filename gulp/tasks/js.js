/* eslint-disable no-undef */
const webpackStream = require('webpack-stream');
// const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
exports.js = () => {
	return app.gulp
		.src(app.pathes.src.js)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'JS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(webpackStream(webpackConfig))
		.pipe(app.gulp.dest(app.pathes.build.js))
		.pipe(app.plugins.browsersync.stream());
};

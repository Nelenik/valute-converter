/* eslint-disable no-undef */
const htmlMin = require('gulp-htmlmin');
const fileInclude = require('gulp-file-include');

exports.html = () => {
	return app.gulp
		.src(app.pathes.src.html)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'HTML',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(fileInclude())
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
		.pipe(
			app.plugins.gulpif(
				app.isBuild,
				htmlMin({
					collapseWhitespace: true,
				})
			)
		)
		.pipe(app.gulp.dest(app.pathes.build.html))
		.pipe(app.plugins.browsersync.stream());
};

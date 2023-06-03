/* eslint-disable no-undef */
const toWebp = require('gulp-webp');
const image = require('gulp-image');

exports.images = () => {
	return (
		app.gulp
			.src(app.pathes.src.images)
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'IMAGES',
						message: 'Error: <%= error.message %>',
					})
				)
			)
			.pipe(toWebp())
			// .pipe(app.gulp.dest('src/img'))
			.pipe(app.gulp.dest(app.pathes.build.images))
			.pipe(app.gulp.src(app.pathes.src.images))
			.pipe(app.plugins.gulpif(app.isBuild, image()))
			.pipe(app.gulp.dest(app.pathes.build.images))
			.pipe(app.gulp.src(app.pathes.src.svg))
			.pipe(app.gulp.dest(app.pathes.build.images))
			.pipe(app.plugins.browsersync.stream())
	);
};

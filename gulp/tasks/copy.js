/* eslint-disable no-undef */
exports.copy = () => {
	return app.gulp
		.src(app.pathes.src.resources)
		.pipe(app.gulp.dest(app.pathes.build.resources))
		.pipe(app.plugins.browsersync.stream());
};

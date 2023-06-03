/* eslint-disable no-undef */
const svgSprite = require('gulp-svg-sprite');

exports.spriteColor = () => {
	return (
		app.gulp
			.src(app.pathes.src.spriteiconsColor)
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'SPRITE',
						message: 'Error: <%= error.message %>',
					})
				)
			)
			// .pipe(
			// 	cheerio({
			// 		run: function ($) {
			// 			$('[fill]')
			// 				.filter(function () {
			// 					return $(this).attr('fill') !== 'currentColor';
			// 				})
			// 				.removeAttr('fill');
			// 			$('[stroke]')
			// 				.filter(function () {
			// 					return $(this).attr('stroke') !== 'currentColor';
			// 				})
			// 				.removeAttr('stroke');
			// 			// $('[fill]').removeAttr('fill');
			// 			// $('[stroke]').removeAttr('stroke');
			// 			$('[style]').removeAttr('style');
			// 		},
			// 		parserOptions: { xmlMode: true },
			// 	})
			// )
			.pipe(app.plugins.replace('&gt;', '>'))
			.pipe(
				svgSprite({
					mode: {
						stack: {
							sprite: '../sprite-color.svg',
						},
					},
				})
			)
			.pipe(app.gulp.dest(app.pathes.build.html))
			.pipe(app.plugins.browsersync.stream())
	);
};

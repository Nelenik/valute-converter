/* eslint-disable no-undef */
exports.server = () => {
	app.plugins.browsersync.init({
		server: {
			baseDir: `${app.pathes.build.html}`,
		},
		notify: false,
		port: 3000,
	});
};

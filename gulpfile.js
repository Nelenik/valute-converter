/* eslint-disable no-undef */
const gulp = require('gulp'); //импот основного модуля
const pathes = require('./gulp/configs/pathes.js').pathes; //импорт путей, объект pathes
const plugins = require('./gulp/configs/plugins.js').plugins; //импорт общих плагинов, объект plugins

//передаем значения в глобальную переменную
global.app = {
	isBuild: process.argv.includes('--build'),
	gulp: gulp,
	pathes: pathes,
	plugins: plugins,
};
// импорт тасков
const copy = require('./gulp/tasks/copy.js').copy;
const html = require('./gulp/tasks/html.js').html;
const reset = require('./gulp/tasks/reset.js').reset;
const server = require('./gulp/tasks/test-server.js').server;
const scss = require('./gulp/tasks/scss.js').scss;
const images = require('./gulp/tasks/images.js').images;
const sprite = require('./gulp/tasks/sprite.js').sprite;
const spriteColor = require('./gulp/tasks/sprite-color.js').spriteColor;
const js = require('./gulp/tasks/js.js').js;

//наблюдатель
const watcher = () => {
	gulp.watch(pathes.watch.resources, copy);
	gulp.watch(pathes.watch.html, html);
	gulp.watch(pathes.watch.scss, scss);
	gulp.watch(pathes.watch.images, images);
	gulp.watch(pathes.watch.spriteicons, sprite);
	gulp.watch(pathes.watch.spriteiconsColor, spriteColor);
	gulp.watch(pathes.watch.js, js);
};

//параллельные задачи
const show = gulp.parallel(watcher, server);
const mainTasks = gulp.parallel(
	copy,
	scss,
	images,
	html,
	sprite,
	spriteColor,
	js
);

exports.default = gulp.series(reset, mainTasks, show);
exports.build = gulp.series(reset, mainTasks);
console.log(app.isBuild);

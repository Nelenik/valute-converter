/* eslint-disable no-undef */
const browsersync = require('browser-sync').create('testServer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpif = require('gulp-if');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

exports.plugins = {
	browsersync: browsersync,
	notify: notify,
	plumber: plumber,
	gulpif: gulpif,
	replace: replace,
	sourcemaps: sourcemaps,
	concat: concat,
};

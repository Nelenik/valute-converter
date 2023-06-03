/* eslint-disable no-undef */
const buildFolder = './dist'; //путь к папке с рез
const srcFolder = './src'; // путь к папке с исходниками

exports.pathes = {
	build: {
		html: `${buildFolder}`,
		css: `${buildFolder}/css/`,
		images: `${buildFolder}/img/`,
		js: `${buildFolder}/js/`,
		resources: `${buildFolder}/resources/`, //папка с локальными версиями библиотек, шрифты
	},
	src: {
		html: `${srcFolder}/*.html`,
		scss: `${srcFolder}/scss/*.scss`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		spriteicons: `${srcFolder}/spriteicons/*.svg`,
		spriteiconsColor: `${srcFolder}/spriteicons-color/*.svg`,
		// js: `${srcFolder}/js/**/*.js`,
		js: `${srcFolder}/js/*.js`,
		resources: `${srcFolder}/resources/**/*`,
	},
	watch: {
		html: `${srcFolder}/**/*.html`, //все html в src и подкаталогах
		scss: `${srcFolder}/scss/**/*.scss`, //все файлы css в css и подкаталогах
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,ico,webp}`, //все изображения в папке img и подкаталогах
		js: `${srcFolder}/js/**/*.js`, //все файлы js в папке js  и подкаталогах
		spriteicons: `${srcFolder}/spriteicons/*.svg`, //все файлы svg в spriteicons
		spriteiconsColor: `${srcFolder}/spriteicons-color/*.svg`,
		resources: `${srcFolder}/resources/**/*.*`, // все файлы в resources и подкаталогах
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
};

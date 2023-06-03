// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	plugins: ['prettier'],
	extends: ['eslint:recommended', 'prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'no-var': 'error',
		'no-duplicate-imports': 'error',
		'no-template-curly-in-string': 'error',
		'no-extra-semi': 'error',
		semi: 'error',
		'prettier/prettier': 'error',
	},
	ignorePatterns: ['node_modules/', 'dist/'],
};

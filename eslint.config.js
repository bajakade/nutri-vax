// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const simpleImportSortPlugin = require('eslint-plugin-simple-import-sort');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*', 'nativewind-env*'],
  },
  {
    files: ['**/*.ts', '**/*./tsx'],
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'warn',
      'max-len': [
        'error',
        {
          code: 100,
          ignorePattern: '^import .*',
        },
      ],
      semi: 'warn',
      quotes: ['error', 'single'],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
]);

// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const importPlugin = require('eslint-plugin-import');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
  },
  {
    files: ['**/*.ts', '**/*./tsx'],
    plugins: {
      import: importPlugin,
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
      'import/order': ['error'],
    },
  },
]);

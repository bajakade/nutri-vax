// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
  },
  {
    files: ['**/*.ts'],
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
    },
  },
]);

// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }], // Use nativewind as the JSX import source
      'nativewind/babel', // Add the nativewind babel plugin
    ],
    plugins: [
      'react-native-reanimated/plugin', // Essential for reanimated
      'react-native-quick-crypto',
    ],
  };
};

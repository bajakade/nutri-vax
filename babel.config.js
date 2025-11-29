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
      [
        'module-resolver',
        {
          alias: {
            crypto: 'react-native-quick-crypto',
            stream: 'stream-browserify',
            buffer: '@craftzdog/react-native-buffer',
            events: 'events',
          },
        },
      ],
    ],
  };
};

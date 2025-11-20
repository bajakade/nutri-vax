// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Point NativeWind at the CSS entry used in the Expo Router app folder.
// The project places the Tailwind entry at `app/global.css` (imported from
// `app/_layout.tsx`), so pass that path explicitly so NativeWind's Metro
// integration can locate and compile the CSS and inject it into the runtime.
module.exports = withNativeWind(config, { input: "./app/global.css" });

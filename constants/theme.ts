/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    // Original expo template
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    // -------------------------
    // Added: Your custom theme
    // -------------------------
    foreground: '#000000',
    card: '#ffffff',
    cardForeground: '#000000',
    popover: '#ffffff',
    popoverForeground: '#000000',

    primary: '#006600',
    primaryForeground: '#ffffff',

    secondary: '#f0f0f0',
    secondaryForeground: '#000000',

    muted: '#f5f5f5',
    mutedForeground: '#666666',

    accent: '#00A651',
    accentForeground: '#ffffff',

    destructive: '#DC3545',
    destructiveForeground: '#ffffff',

    success: '#28A745',
    successForeground: '#ffffff',

    warning: '#FD7E14',
    warningForeground: '#ffffff',

    border: 'rgba(0, 0, 0, 0.1)',
    input: 'transparent',
    inputBackground: '#f8f8f8',
    switchBackground: '#cbced4',

    ring: '#006600',

    chart1: '#006600',
    chart2: '#00A651',
    chart3: '#28A745',
    chart4: '#FD7E14',
    chart5: '#DC3545',

    sidebar: '#006600',
    sidebarForeground: '#ffffff',
    sidebarPrimary: '#00A651',
    sidebarPrimaryForeground: '#ffffff',
    sidebarAccent: '#005500',
    sidebarAccentForeground: '#ffffff',
    sidebarBorder: '#005500',
    sidebarRing: '#00A651',
  },

  dark: {
    // Original expo template
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    // -------------------------
    // Added: Your custom theme
    // -------------------------
    foreground: 'oklch(0.985 0 0)',

    card: 'oklch(0.145 0 0)',
    cardForeground: 'oklch(0.985 0 0)',

    popover: 'oklch(0.145 0 0)',
    popoverForeground: 'oklch(0.985 0 0)',

    primary: 'oklch(0.985 0 0)',
    primaryForeground: 'oklch(0.205 0 0)',

    secondary: 'oklch(0.269 0 0)',
    secondaryForeground: 'oklch(0.985 0 0)',

    muted: 'oklch(0.269 0 0)',
    mutedForeground: 'oklch(0.708 0 0)',

    accent: 'oklch(0.269 0 0)',
    accentForeground: 'oklch(0.985 0 0)',

    destructive: 'oklch(0.396 0.141 25.723)',
    destructiveForeground: 'oklch(0.637 0.237 25.331)',

    border: 'oklch(0.269 0 0)',
    input: 'oklch(0.269 0 0)',
    ring: 'oklch(0.439 0 0)',

    chart1: 'oklch(0.488 0.243 264.376)',
    chart2: 'oklch(0.696 0.17 162.48)',
    chart3: 'oklch(0.769 0.188 70.08)',
    chart4: 'oklch(0.627 0.265 303.9)',
    chart5: 'oklch(0.645 0.246 16.439)',

    sidebar: 'oklch(0.205 0 0)',
    sidebarForeground: 'oklch(0.985 0 0)',
    sidebarPrimary: 'oklch(0.488 0.243 264.376)',
    sidebarPrimaryForeground: 'oklch(0.985 0 0)',
    sidebarAccent: 'oklch(0.269 0 0)',
    sidebarAccentForeground: 'oklch(0.985 0 0)',
    sidebarBorder: 'oklch(0.269 0 0)',
    sidebarRing: 'oklch(0.439 0 0)',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

import { ThemeDarkColor, ThemeLightColor } from '@/app/providers/theme';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Simplified hook to get theme colors by name.
 * Returns the color value for the current color scheme (light/dark).
 *
 * @param colorName - The name of the color from the theme palette
 * @returns The color value as a string
 */
export function useColor(colorName: keyof ThemeLightColor & keyof ThemeDarkColor): string {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = useTheme();

  const fallback = Colors[colorScheme][colorName];
  if (!theme?.colors) {
    return fallback;
  }

  const candidate = theme.colors[colorName as keyof ThemeLightColor];
  return (typeof candidate === 'string' ? candidate : undefined) ?? fallback;
}

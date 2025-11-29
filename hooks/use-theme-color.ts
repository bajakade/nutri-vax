/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = useTheme();

  const colorFromProps = props[colorScheme];
  if (colorFromProps) {
    return colorFromProps;
  }

  const fallback = Colors[colorScheme][colorName];
  if (!theme?.colors) {
    return fallback;
  }

  const candidate = theme.colors[colorName as keyof typeof theme.colors];
  return (typeof candidate === 'string' ? candidate : undefined) ?? fallback;
}

import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

// useTheme.ts
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { createContext } from 'react';

export type ThemeLightColor = typeof Colors.light;
export type ThemeDarkColor = typeof Colors.dark;

type TTheme = {
  colors: ThemeLightColor & Theme;
};

export const ThemeContext = createContext<TTheme>({} as TTheme);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();

  const getTheme = (mode?: 'light' | 'dark' | null) => {
    const theme = mode === 'dark' ? DarkTheme : DefaultTheme;

    return {
      ...theme,
      dark: mode === 'dark',
      colors: { ...theme.colors, ...Colors[mode || 'light'] },
    };
  };
  const defaultTheme = getTheme(colorScheme);

  return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;

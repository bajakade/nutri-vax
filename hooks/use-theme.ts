import { ThemeContext } from '@/app/providers/theme';
import { useContext } from 'react';

export const useTheme = () => useContext(ThemeContext);

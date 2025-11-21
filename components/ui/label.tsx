import { Text } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

export function Label({ children, style }: { children: React.ReactNode; style?: any }) {
  const color = useThemeColor({}, 'mutedForeground');

  return <Text style={[{ fontSize: 14, marginBottom: 4, color }, style]}>{children}</Text>;
}

import { TextInput } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

export function Input({ style, ...props }: { style?: any; [key: string]: any }) {
  const bg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const placeholder = useThemeColor({}, 'mutedForeground');

  return (
    <TextInput
      style={[
        {
          height: 44,
          borderWidth: 2,
          borderColor: border,
          backgroundColor: bg,
          paddingHorizontal: 12,
          borderRadius: 12,
          color: text,
        },
        style,
      ]}
      placeholderTextColor={placeholder}
      {...props}
    />
  );
}

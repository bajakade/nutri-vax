import { Text, TextInput, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

interface InputProps {
  style?: any;
  helperText?: string | null;
  [key: string]: any;
}

export function Input({ style, helperText = null, ...props }: InputProps) {
  const bg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const placeholder = useThemeColor({}, 'mutedForeground');
  const errorColor = useThemeColor({}, 'destructive');

  const finalBorderColor = helperText ? errorColor : border;

  return (
    <View className="w-full">
      <TextInput
        className="h-11 border-2 px-3 rounded-xl"
        style={[
          {
            borderWidth: 2,
            borderColor: finalBorderColor,
            backgroundColor: bg,
            color: text,
          },
          style,
        ]}
        placeholderTextColor={placeholder}
        {...props}
      />
      {helperText && (
        <Text className="mt-0 text-xs" style={{ color: errorColor }}>
          {helperText}
        </Text>
      )}
    </View>
  );
}

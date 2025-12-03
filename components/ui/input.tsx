import { Text, TextInput, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { cn } from '@/lib/utils';

interface InputProps {
  style?: any;
  helperText?: string | null;
  [key: string]: any;
}

export function Input({ style, helperText = null, ...props }: InputProps) {
  const placeholder = useThemeColor({}, 'mutedForeground');

  return (
    <View className="w-full">
      <TextInput
        className={cn(
          'h-11 rounded-xl border-2 px-3 bg-card text-foreground',
          helperText ? 'border-destructive' : 'border-border',
        )}
        style={style}
        placeholderTextColor={placeholder}
        {...props}
      />
      {helperText && <Text className="mt-0 text-xs text-destructive">{helperText}</Text>}
    </View>
  );
}

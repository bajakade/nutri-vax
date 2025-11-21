import { Pressable, Text, ViewStyle, TextStyle } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type Size = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
  disabled?: boolean;
}

export function Button({
  variant = 'default',
  size = 'default',
  children,
  style,
  textStyle,
  onPress,
  disabled,
}: ButtonProps) {
  const bgPrimary = useThemeColor({}, 'primary');
  const bgDestructive = useThemeColor({}, 'destructive');
  const bgSecondary = useThemeColor({}, 'secondary');
  const textPrimary = useThemeColor({}, 'primaryForeground');
  const textOnDark = useThemeColor({}, 'foreground');
  const borderColor = useThemeColor({}, 'border');
  const accent = useThemeColor({}, 'accent');

  const variantStyles: Record<Variant, ViewStyle> = {
    default: {
      backgroundColor: bgPrimary,
    },
    destructive: {
      backgroundColor: bgDestructive,
    },
    outline: {
      borderWidth: 1,
      borderColor: borderColor,
      backgroundColor: 'transparent',
    },
    secondary: {
      backgroundColor: bgSecondary,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    link: {
      backgroundColor: 'transparent',
    },
  };

  const textStyles: Record<Variant, TextStyle> = {
    default: { color: textPrimary },
    destructive: { color: textPrimary },
    outline: { color: textOnDark },
    secondary: { color: textOnDark },
    ghost: { color: accent },
    link: { color: accent, textDecorationLine: 'underline' },
  };

  const sizeStyles: Record<Size, ViewStyle> = {
    default: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
    sm: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
    lg: { paddingVertical: 14, paddingHorizontal: 20, borderRadius: 10 },
    icon: {
      padding: 10,
      borderRadius: 50,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        },
        variantStyles[variant],
        sizeStyles[size],
        style,
      ]}
    >
      <Text style={[{ fontSize: 16, fontWeight: '500' }, textStyles[variant], textStyle]}>
        {children}
      </Text>
    </Pressable>
  );
}

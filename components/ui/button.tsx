import { Pressable, PressableProps, Text, View, ViewStyle } from 'react-native';

import React from 'react';
import { cn } from '@/lib/utils';
import { useThemeColor } from '@/hooks/use-theme-color';

export type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type Size = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      variant = 'default',
      size = 'default',
      children,
      className,
      textClassName,
      disabled,
      onPress,
      ...props
    },
    ref,
  ) => {
    const bgPrimary = useThemeColor({}, 'primary');
    const bgDestructive = useThemeColor({}, 'destructive');
    const bgSecondary = useThemeColor({}, 'secondary');
    // Text color for the default button (on top of `primary` background).
    const textPrimary = useThemeColor({}, 'primaryForeground');
    const textOnDark = useThemeColor({}, 'foreground');
    const borderColor = useThemeColor({}, 'border');
    const accent = useThemeColor({}, 'accent');

    const variantClassNames: Record<Variant, string> = {
      default: '',
      destructive: '',
      outline: 'border',
      secondary: '',
      ghost: 'bg-transparent',
      link: 'bg-transparent',
    };

    const variantStyleMap: Record<Variant, ViewStyle> = {
      default: { backgroundColor: bgPrimary },
      destructive: { backgroundColor: bgDestructive },
      outline: { backgroundColor: 'transparent', borderColor, borderWidth: 1 },
      secondary: { backgroundColor: bgSecondary },
      ghost: { backgroundColor: 'transparent' },
      link: { backgroundColor: 'transparent' },
    };

    const textColorMap: Record<Variant, string> = {
      default: textPrimary,
      destructive: textPrimary,
      outline: textOnDark,
      secondary: textOnDark,
      ghost: accent,
      link: accent,
    };

    const sizeStyles: Record<Size, string> = {
      default: 'h-11 px-5 rounded-xl',
      sm: 'h-9 px-3 rounded-lg',
      lg: 'h-14 px-8 rounded-2xl',
      icon: 'h-10 w-10 rounded-full',
    };

    // Helper: wrap any plain string/number child in <Text> so we can apply the
    // computed text color (from theme) and spacing consistently.
    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (typeof child === 'string' || typeof child === 'number') {
          return (
            <Text
              className={cn(
                'font-medium text-base',
                variant === 'link' && 'underline',
                textClassName,
              )}
              style={[{ color: textColorMap[variant] }]}
            >
              {child}
            </Text>
          );
        }
        return child;
      });
    };

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        className={cn(
          'flex-row items-center justify-center gap-2 active:opacity-80',
          variantClassNames[variant],
          sizeStyles[size],
          disabled && 'opacity-50',
          className,
        )}
        style={[variantStyleMap[variant]]}
        {...props}
      >
        {renderChildren()}
      </Pressable>
    );
  },
);

Button.displayName = 'Button';

import { useThemeColor } from '@/hooks/use-theme-color';
import { cn } from '@/lib/utils';
import React from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type Size = 'default' | 'sm' | 'lg' | 'icon';

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

    const variantStyles: Record<Variant, string> = {
      default: `bg-[${bgPrimary}]`,
      destructive: `bg-[${bgDestructive}]`,
      outline: `border border-[${borderColor}] bg-transparent`,
      secondary: `bg-[${bgSecondary}]`,
      ghost: 'bg-transparent',
      link: 'bg-transparent',
    };

    const textStyles: Record<Variant, string> = {
      default: `text-[${textPrimary}]`,
      destructive: `text-[${textPrimary}]`,
      outline: `text-[${textOnDark}]`,
      secondary: `text-[${textOnDark}]`,
      ghost: `text-[${accent}]`,
      link: `text-[${accent}] underline`,
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
              className={cn('font-medium text-base', textStyles[variant], textClassName)}
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
          variantStyles[variant],
          sizeStyles[size],
          disabled && 'opacity-50',
          className,
        )}
        {...props}
      >
        {renderChildren()}
      </Pressable>
    );
  },
);

Button.displayName = 'Button';

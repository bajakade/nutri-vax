import React from 'react';
import { Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedText({
  type = 'default',
  className = '',
  lightColor,
  darkColor,
  style,
  ...rest
}: ThemedTextProps) {
  const typeClasses = {
    default: 'text-base leading-6',
    defaultSemiBold: 'text-base leading-6 font-semibold',
    title: 'text-4xl font-bold leading-tight',
    subtitle: 'text-xl font-bold',
    link: 'text-base leading-7 text-primary underline',
  };

  const colorClass = lightColor || darkColor ? '' : 'text-foreground';

  return (
    <Text
      className={`font-medium ${colorClass} ${typeClasses[type]} ${className}`}
      style={style}
      {...rest}
    />
  );
}

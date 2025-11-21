import React from 'react';
import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  transparent?: boolean;
  color?: string;
  className?: string;
};

export function ThemedView({
  transparent = false,
  color,
  className = '',
  style,
  ...rest
}: ThemedViewProps) {
  const bgClass = color 
    ? '' 
    : transparent 
      ? 'bg-transparent' 
      : 'bg-background'; 

  return (
    <View
      className={`${bgClass} ${className}`}
      style={style} 
      {...rest}
    />
  );
}
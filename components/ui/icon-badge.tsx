import Feather from '@expo/vector-icons/Feather';
import React, { ComponentProps } from 'react';
import { View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { cn } from '@/lib/utils';

type FeatherName = ComponentProps<typeof Feather>['name'];
type ThemeColor = Parameters<typeof useThemeColor>[1];

export type IconBadgeProps = {
  name: FeatherName;
  tone?: 'primary' | 'accent' | 'muted';
  size?: number;
  className?: string;
  backgroundColor?: string;
};

const toneMap: Record<NonNullable<IconBadgeProps['tone']>, ThemeColor> = {
  primary: 'primary',
  accent: 'accent',
  muted: 'mutedForeground',
};

const toneBgClasses: Record<NonNullable<IconBadgeProps['tone']>, string> = {
  primary: 'bg-primary/10',
  accent: 'bg-accent/10',
  muted: 'bg-muted-foreground/10',
};

const IconBadge = ({
  tone = 'accent',
  size = 20,
  className = '',
  backgroundColor,
  name,
}: IconBadgeProps) => {
  const tint = useThemeColor({}, toneMap[tone]);
  const containerClass = cn(
    'h-12 w-12 items-center justify-center rounded-2xl',
    toneBgClasses[tone],
    className,
  );

  return (
    <View className={containerClass} style={backgroundColor ? { backgroundColor } : undefined}>
      <Feather name={name} size={size} color={tint} />
    </View>
  );
};

export default IconBadge;

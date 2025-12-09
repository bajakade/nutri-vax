import Feather from '@expo/vector-icons/Feather';
import React, { ComponentProps } from 'react';
import { View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { withOpacity } from '@/lib/color';
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

const IconBadge = ({
  tone = 'accent',
  size = 20,
  className = '',
  backgroundColor,
  name,
}: IconBadgeProps) => {
  const tint = useThemeColor({}, toneMap[tone]);
  const surface = useThemeColor({}, 'neutralSurface');
  const bg = backgroundColor ?? withOpacity(tint, 0.15) ?? surface;

  return (
    <View
      className={cn('h-12 w-12 items-center justify-center rounded-2xl', className)}
      style={{ backgroundColor: bg }}
    >
      <Feather name={name} size={size} color={tint} />
    </View>
  );
};

export default IconBadge;

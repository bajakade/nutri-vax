import React from 'react';
import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { cn } from '@/lib/utils';

export type SurfaceCardProps = ViewProps & {
  padded?: boolean;
  className?: string;
};

const SurfaceCard = ({
  padded = true,
  className = '',
  style,
  children,
  ...rest
}: SurfaceCardProps) => {
  const card = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');

  return (
    <View
      className={cn('rounded-3xl border', padded && 'p-4', className)}
      style={[
        {
          backgroundColor: card,
          borderColor: border,
          shadowColor: '#000000',
          shadowOpacity: 0.04,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 8 },
          elevation: 3,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default SurfaceCard;

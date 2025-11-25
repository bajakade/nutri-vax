import React, { PropsWithChildren } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type SectionCardProps = PropsWithChildren<{
  title: string;
  accentColor?: string;
  accentSurface?: string;
  contentStyle?: StyleProp<ViewStyle>;
}>;

export const SectionCard = ({
  title,
  children,
  accentColor,
  accentSurface,
  contentStyle,
}: SectionCardProps) => {
  const card = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const success = useThemeColor({}, 'success');
  const secondarySurface = useThemeColor({}, 'secondary');
  const headerColor = accentColor ?? success;
  const surface = accentSurface ?? secondarySurface;

  return (
    <View
      style={{
        marginBottom: 24,
        borderWidth: 1,
        borderColor,
        backgroundColor: card,
        borderRadius: 24,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderColor,
          backgroundColor: surface,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', color: headerColor }}>{title}</Text>
      </View>

      <View style={[{ padding: 24, gap: 20 }, contentStyle]}>{children}</View>
    </View>
  );
};

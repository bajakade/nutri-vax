import React, { PropsWithChildren } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { useColor } from '@/hooks/use-color';

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
  const card = useColor('card');
  const borderColor = useColor('border');
  const success = useColor('success');
  const secondarySurface = useColor('secondary');
  const headerColor = accentColor ?? success;
  const surface = accentSurface ?? secondarySurface;

  return (
    <View
      className="mb-6 overflow-hidden rounded-3xl border"
      style={{
        borderColor,
        backgroundColor: card,
      }}
    >
      <View
        className="border-b px-6 py-4"
        style={{
          borderColor,
          backgroundColor: surface,
        }}
      >
        <Text className="text-lg font-semibold" style={{ color: headerColor }}>
          {title}
        </Text>
      </View>

      <View style={[{ padding: 24, gap: 20 }, contentStyle]}>{children}</View>
    </View>
  );
};

import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { Text, View } from 'react-native';

export default function TopBarHeader() {
  const background = useThemeColor({}, 'background');
  const border = useThemeColor({}, 'border');
  const primary = useThemeColor({}, 'primary');
  const primaryForeground = useThemeColor({}, 'primaryForeground');

  return (
    <View
      style={{
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
        backgroundColor: background,
        borderBottomWidth: 1,
        borderBottomColor: border,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          width: 28,
          height: 28,
          backgroundColor: primary,
          borderRadius: 14,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: primaryForeground, fontSize: 14, fontWeight: '700' }}>NV</Text>
      </View>

      <Text style={{ color: primary, fontSize: 16, fontWeight: '600' }}>NutriVax</Text>
    </View>
  );
}

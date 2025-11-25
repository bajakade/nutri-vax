import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { YoN } from '@/types/enum';

export type YesNoButtonGroupProps = {
  value: YoN;
  onChange: (value: YoN) => void;
  onBlur?: () => void;
};

export function YesNoButtonGroup({ value, onChange, onBlur }: YesNoButtonGroupProps) {
  const primary = useThemeColor({}, 'primary');
  const primaryForeground = useThemeColor({}, 'primaryForeground');
  const borderColor = useThemeColor({}, 'border');
  const foreground = useThemeColor({}, 'foreground');
  const selectionActiveBg = useThemeColor({ light: '#e8f5e9', dark: '#064e3b' }, 'secondary');
  const selectionInactiveBg = useThemeColor({ light: '#ffffff', dark: '#1f2937' }, 'card');

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
      {Object.values(YoN).map((option) => {
        const isSelected = value === option;
        return (
          <TouchableOpacity
            key={option}
            onPress={() => {
              onChange(option);
              onBlur?.();
            }}
            style={{
              flex: 1,
              marginHorizontal: 4,
              paddingVertical: 14,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: isSelected ? primary : borderColor,
              backgroundColor: isSelected ? selectionActiveBg : selectionInactiveBg,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: isSelected ? primaryForeground : foreground,
              }}
            >
              {option === YoN.Yes ? 'Yes' : 'No'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

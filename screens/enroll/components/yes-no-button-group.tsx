import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useColor } from '@/hooks/use-color';
import { YoN } from '@/types/enum';

export type YesNoButtonGroupProps = {
  value: YoN;
  onChange: (value: YoN) => void;
  onBlur?: () => void;
};

export function YesNoButtonGroup({ value, onChange, onBlur }: YesNoButtonGroupProps) {
  const primary = useColor('primary');
  const primaryForeground = useColor('primaryForeground');
  const borderColor = useColor('border');
  const foreground = useColor('foreground');
  const selectionActiveBg = useColor('secondary');
  const selectionInactiveBg = useColor('card');

  return (
    <View className="mb-2 flex-row justify-between">
      {Object.values(YoN).map((option) => {
        const isSelected = value === option;
        return (
          <TouchableOpacity
            key={option}
            onPress={() => {
              onChange(option);
              onBlur?.();
            }}
            className="mx-1 flex-1 items-center rounded-xl border-2 py-3.5"
            style={{
              borderColor: isSelected ? primary : borderColor,
              backgroundColor: isSelected ? selectionActiveBg : selectionInactiveBg,
            }}
          >
            <Text
              className="text-base font-medium"
              style={{ color: isSelected ? primaryForeground : foreground }}
            >
              {option === YoN.Yes ? 'Yes' : 'No'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

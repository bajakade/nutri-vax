import { IFormValue, IOption } from '@/types';
import { Text, TouchableOpacity, View } from 'react-native';

import { useColor } from '@/hooks/use-color';
import React from 'react';

export type ButtonGroupProps = {
  value: string;
  options: IOption[];
  onChange: (value: IFormValue) => void;
  onBlur?: () => void;
};

export function ButtonGroup({ value, options, onChange, onBlur }: ButtonGroupProps) {
  const primary = useColor('primary');
  const borderColor = useColor('border');
  const selectionActiveBg = useColor('secondary');
  const selectionInactiveBg = useColor('card');

  return (
    <View className="mb-2 flex-row justify-between">
      {options.map(({ label, value: key }) => {
        const isSelected = value === key;
        return (
          <TouchableOpacity
            key={label}
            onPress={() => {
              onChange(key);
              onBlur?.();
            }}
            className="flex-1 mx-1 items-center rounded-lg border-2 py-3"
            style={{
              borderColor: isSelected ? primary : borderColor,
              backgroundColor: isSelected ? selectionActiveBg : selectionInactiveBg,
            }}
          >
            <Text className="text-base font-medium text-foreground dark:text-background">
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

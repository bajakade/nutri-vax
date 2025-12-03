import { IFormValue, IOption } from '@/types';
import { Text, TouchableOpacity, View } from 'react-native';

import { cn } from '@/lib/utils';
import React from 'react';

export type ButtonGroupProps = {
  value: string;
  options: IOption[];
  onChange: (value: IFormValue) => void;
  onBlur?: () => void;
};

export function ButtonGroup({ value, options, onChange, onBlur }: ButtonGroupProps) {
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
            className={cn(
              'mx-1 flex-1 items-center rounded-lg border-2 py-3',
              isSelected ? 'border-primary bg-secondary' : 'border-border bg-card',
            )}
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

import { Text, View } from 'react-native';

import { Input } from '@/components/ui';
import React from 'react';
import { ReferralFormData } from '@/types';

type Props = {
  name: keyof ReferralFormData;
  label: string;
  placeholder?: string;
  keyboardType?: any;
  value?: string;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  handleOnChange: <K extends keyof ReferralFormData>(key: K, value: ReferralFormData[K]) => void;
};

export default function TextInput({
  name,
  label,
  placeholder,
  keyboardType,
  value,
  multiline,
  numberOfLines,
  editable = true,
  handleOnChange,
}: Props) {
  return (
    <View className="flex-1 bg-background dark:bg-input">
      <Text className="mb-2 text-sm font-medium text-foreground dark:text-muted">{label}</Text>
      <Input
        placeholder={placeholder}
        value={value}
        editable={editable}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onChangeText={(text: string) => handleOnChange(name, text as any)}
      />
    </View>
  );
}

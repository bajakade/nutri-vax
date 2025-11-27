import { Input } from '@/components/ui/input';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ReferralFormData } from '@/types';
import React from 'react';
import { Text, View } from 'react-native';

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

export default function ReferralInput({
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
  const foreground = useThemeColor({}, 'foreground');
  const background = useThemeColor({}, 'background');
  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <Text style={{ marginBottom: 8, fontSize: 14, fontWeight: '500', color: foreground }}>
        {label}
      </Text>
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

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Save } from 'lucide-react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type SubmissionActionsProps = {
  onCancel: () => void;
  onSubmit: () => void;
};

export const SubmissionActions = ({ onCancel, onSubmit }: SubmissionActionsProps) => {
  const borderColor = useThemeColor({}, 'border');
  const foreground = useThemeColor({}, 'foreground');
  const success = useThemeColor({}, 'success');
  const successForeground = useThemeColor({}, 'successForeground');

  return (
    <View style={{ flexDirection: 'row', gap: 16, paddingBottom: 40 }}>
      <TouchableOpacity
        onPress={onCancel}
        style={{
          flex: 1,
          paddingVertical: 14,
          borderRadius: 20,
          borderWidth: 1,
          borderColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        activeOpacity={0.85}
      >
        <Text style={{ fontWeight: '600', color: foreground }}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onSubmit}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 14,
          borderRadius: 20,
          backgroundColor: success,
          gap: 8,
        }}
        activeOpacity={0.9}
      >
        <Save size={18} color={successForeground} />
        <Text style={{ fontWeight: '700', color: successForeground }}>Generate Referral</Text>
      </TouchableOpacity>
    </View>
  );
};

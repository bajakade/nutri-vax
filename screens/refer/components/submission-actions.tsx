import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Save } from 'lucide-react-native';

import { useColor } from '@/hooks/use-color';

export type SubmissionActionsProps = {
  onCancel: () => void;
  onSubmit: () => void;
};

export const SubmissionActions = ({ onCancel, onSubmit }: SubmissionActionsProps) => {
  const borderColor = useColor('border');
  const foreground = useColor('foreground');
  const success = useColor('success');
  const successForeground = useColor('successForeground');

  return (
    <View className="flex-row gap-4 pb-10">
      <TouchableOpacity
        onPress={onCancel}
        className="flex-1 items-center justify-center rounded-[20px] border py-3.5"
        style={{ borderColor }}
        activeOpacity={0.85}
      >
        <Text className="font-semibold" style={{ color: foreground }}>
          Cancel
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onSubmit}
        className="flex-1 flex-row items-center justify-center gap-2 rounded-[20px] py-3.5"
        style={{ backgroundColor: success }}
        activeOpacity={0.9}
      >
        <Save size={18} color={successForeground} />
        <Text className="font-bold" style={{ color: successForeground }}>
          Generate Referral
        </Text>
      </TouchableOpacity>
    </View>
  );
};

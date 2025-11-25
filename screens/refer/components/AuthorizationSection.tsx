import React from 'react';
import { Text, View } from 'react-native';

import { Input } from '@/components/ui/input';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ReferralFormData } from '@/types';

import { UpdateReferralForm } from '../helpers';
import { SectionCard } from './SectionCard';

type AuthorizationSectionProps = {
  formData: ReferralFormData;
  onUpdate: UpdateReferralForm;
  successColor: string;
  successSurface: string;
};

export const AuthorizationSection = ({
  formData,
  onUpdate,
  successColor,
  successSurface,
}: AuthorizationSectionProps) => {
  const foreground = useThemeColor({}, 'foreground');
  const mutedForeground = useThemeColor({}, 'mutedForeground');

  return (
    <SectionCard title="Authorization" accentColor={successColor} accentSurface={successSurface}>
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: foreground }}>
          Digital Signature *
        </Text>
        <Input
          placeholder="Type your full name"
          value={formData.signature}
          onChangeText={(text: string) => onUpdate('signature', text)}
        />
        <Text style={{ fontSize: 12, color: mutedForeground }}>
          By typing your name, you authorize this referral
        </Text>
      </View>
    </SectionCard>
  );
};

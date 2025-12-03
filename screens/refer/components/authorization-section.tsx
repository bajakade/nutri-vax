import React from 'react';
import { Text, View } from 'react-native';

import { Input } from '@/components/ui/input';
import { ReferralFormData } from '@/types';

import { UpdateReferralForm } from '../helpers';
import { SectionCard } from './section-card';

type AuthorizationSectionProps = {
  formData: ReferralFormData;
  onUpdate: UpdateReferralForm;
};

export const AuthorizationSection = ({ formData, onUpdate }: AuthorizationSectionProps) => {
  return (
    <SectionCard title="Authorization">
      <View className="gap-3">
        <Text className="text-sm font-medium text-foreground">Digital Signature *</Text>
        <Input
          placeholder="Type your full name"
          value={formData.signature}
          onChangeText={(text: string) => onUpdate('signature', text)}
        />
        <Text className="text-xs text-muted-foreground">
          By typing your name, you authorize this referral
        </Text>
      </View>
    </SectionCard>
  );
};

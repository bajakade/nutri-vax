import { Text, View } from 'react-native';

import GenderInput from '@/components/form/gender-input';
import ReferralInput from '@/components/form/referral-input';
import { Input } from '@/components/ui/input';
import { useColor } from '@/hooks/use-color';
import { ReferralFormData } from '@/types';
import React from 'react';
import { UpdateReferralForm } from '../helpers';
import { SectionCard } from './section-card';

type ChildInformationSectionProps = {
  formData: ReferralFormData;
  onUpdate: UpdateReferralForm;
  successSurface: string;
  successColor: string;
};

export const ChildInformationSection = ({
  formData,
  onUpdate,
  successSurface,
  successColor,
}: ChildInformationSectionProps) => {
  const foreground = useColor('foreground');
  const mutedForeground = useColor('mutedForeground');

  return (
    <SectionCard
      title="Child Information"
      accentColor={successColor}
      accentSurface={successSurface}
    >
      <ReferralInput
        name="childName"
        label="Child Name *"
        placeholder="Enter child's name"
        value={formData.childName}
        handleOnChange={onUpdate}
      />

      <ReferralInput
        name="immunizationNumber"
        label="Immunization Number *"
        placeholder="Enter immunization #"
        value={formData.immunizationNumber}
        handleOnChange={onUpdate}
      />

      <ReferralInput
        name="age"
        label="Age (months) *"
        placeholder="e.g. 18"
        keyboardType="numeric"
        value={formData.age}
        handleOnChange={onUpdate}
      />

      <GenderInput
        formData={formData}
        onUpdate={onUpdate}
        successColor={successColor}
        successSurface={successSurface}
      />

      <View>
        <Text className="mb-2 text-sm font-medium" style={{ color: foreground }}>
          MUAC (mm) *
        </Text>
        <Input
          keyboardType="numeric"
          placeholder="Enter MUAC measurement"
          value={formData.muac}
          onChangeText={(text: string) => onUpdate('muac', text)}
        />
      </View>
    </SectionCard>
  );
};

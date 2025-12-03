import { ReferralFormData, UpdateReferralForm } from '@/types';
import { Text, View } from 'react-native';

import GenderInput from '@/components/form/gender-input';
import { Input } from '@/components/ui/input';
import React from 'react';
import ReferralInput from '@/components/form/referral-input';
import { SectionCard } from './section-card';
import { useColor } from '@/hooks/use-color';

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

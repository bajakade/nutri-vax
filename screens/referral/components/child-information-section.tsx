import { GenderInput, TextInput } from '@/components/form';
import { ReferralFormData, UpdateReferralForm } from '@/types';

import React from 'react';
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
  return (
    <SectionCard
      title="Child Information"
      accentColor={successColor}
      accentSurface={successSurface}
    >
      <TextInput
        name="childName"
        label="Child Name *"
        placeholder="Enter child's name"
        value={formData.childName}
        handleOnChange={onUpdate}
      />

      <TextInput
        name="immunizationNumber"
        label="Immunization Number *"
        placeholder="Enter immunization #"
        value={formData.immunizationNumber}
        handleOnChange={onUpdate}
      />

      <TextInput
        name="age"
        label="Age (months) *"
        placeholder="e.g. 18"
        keyboardType="numeric"
        value={formData.age}
        handleOnChange={onUpdate}
      />

      <GenderInput formData={formData} onUpdate={onUpdate} />

      <TextInput
        name="muac"
        label="MUAC (mm) *"
        keyboardType="numeric"
        placeholder="Enter MUAC measurement"
        value={formData.muac}
        handleOnChange={onUpdate}
      />
    </SectionCard>
  );
};

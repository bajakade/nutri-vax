import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import ReferralInput from '@/components/form/referral-input';
import { Input } from '@/components/ui/input';
import { useColor } from '@/hooks/use-color';
import { ReferralFormData } from '@/types';
import { Gender } from '@/types/enum';

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

      <View>
        <Text style={{ marginBottom: 8, fontSize: 14, fontWeight: '500', color: foreground }}>
          Sex *
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
          {([Gender.Male, Gender.Female] as const).map((sex) => (
            <TouchableOpacity
              key={sex}
              onPress={() => onUpdate('sex', sex)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
              activeOpacity={0.85}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: formData.sex === sex ? successColor : mutedForeground,
                  backgroundColor: formData.sex === sex ? successSurface : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {formData.sex === sex && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: successColor,
                    }}
                  />
                )}
              </View>
              <Text style={{ color: foreground }}>{sex === Gender.Male ? 'Male' : 'Female'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View>
        <Text style={{ marginBottom: 8, fontSize: 14, fontWeight: '500', color: foreground }}>
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

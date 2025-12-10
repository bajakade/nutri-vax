import { Alert, ScrollView, Text } from 'react-native';
import { Gender, ReferralType } from '@/types/enum';
import React, { FC, useState } from 'react';
import { ReferralFormData, UpdateReferralForm } from '@/types';

import { AuthorizationSection } from '@/screens/referral/components/authorization-section';
import { ChildInformationSection } from '@/screens/referral/components/child-information-section';
import { ReferralDetailsSection } from '@/screens/referral/components/referral-details-section';
import { SubmissionActions } from '@/screens/referral/components/submission-actions';
import { SubmissionSuccess } from '@/screens/referral/components/submission-success';
import { useColor } from '@/hooks/use-color';
import { useRouter } from 'expo-router';
import { withOpacity } from '@/screens/referral/helpers';

const ReferralFormScreen: FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ReferralFormData>({
    childName: '',
    immunizationNumber: '',
    age: '',
    sex: Gender.Male,
    muac: '',
    settlement: '',
    fromFacility: '',
    toFacility: '',
    referralType: ReferralType.SAM,
    reason: '',
    signature: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const background = useColor('background');
  const mutedForeground = useColor('mutedForeground');
  const success = useColor('success');
  const successSurface = withOpacity(success, 0.12);

  const handleSubmit = () => {
    const required = [
      formData.childName,
      formData.immunizationNumber,
      formData.age,
      formData.muac,
      formData.toFacility,
      formData.reason,
      formData.signature,
    ];

    if (required.some((field) => !field.trim())) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setSubmitted(true);
  };

  const updateForm: UpdateReferralForm = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNewReferral = () => {
    setSubmitted(false);
    setFormData((prev) => ({
      ...prev,
      childName: '',
      immunizationNumber: '',
      age: '',
      muac: '',
      toFacility: '',
      reason: '',
      signature: '',
    }));
  };

  if (submitted) {
    return <SubmissionSuccess onNewReferral={handleNewReferral} />;
  }

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="mb-1 text-2xl font-bold" style={{ color: success }}>
        Referral Form
      </Text>
      <Text className="mb-6" style={{ color: mutedForeground }}>
        Refer child to CMAM program (OTP/PHC)
      </Text>

      <ChildInformationSection
        formData={formData}
        onUpdate={updateForm}
        successColor={success}
        successSurface={successSurface}
      />

      <ReferralDetailsSection
        formData={formData}
        onUpdate={updateForm}
        successColor={success}
        successSurface={successSurface}
      />

      <AuthorizationSection
        formData={formData}
        onUpdate={updateForm}
        successColor={success}
        successSurface={successSurface}
      />

      <SubmissionActions onCancel={() => router.back()} onSubmit={handleSubmit} />
    </ScrollView>
  );
};
export default ReferralFormScreen;

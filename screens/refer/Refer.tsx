import { REFERRAL_TYPE } from '@/constants/referral';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ReferralFormData } from '@/types';
import { Gender } from '@/types/enum';
import { useRouter } from 'expo-router';
import React, { FC, useState } from 'react';
import { Alert, ScrollView, Text } from 'react-native';

import { AuthorizationSection } from '@/screens/refer/components/AuthorizationSection';
import { ChildInformationSection } from '@/screens/refer/components/ChildInformationSection';
import { ReferralDetailsSection } from '@/screens/refer/components/ReferralDetailsSection';
import { SubmissionActions } from '@/screens/refer/components/SubmissionActions';
import { SubmissionSuccess } from '@/screens/refer/components/SubmissionSuccess';
import { UpdateReferralForm, withOpacity } from '@/screens/refer/helpers';

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
    referralType: REFERRAL_TYPE.SAM,
    reason: '',
    signature: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const background = useThemeColor({}, 'background');
  const mutedForeground = useThemeColor({}, 'mutedForeground');
  const success = useThemeColor({}, 'success');
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
      style={{ flex: 1, backgroundColor: background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={{ marginBottom: 4, fontSize: 24, fontWeight: '700', color: success }}>
        Referral Form
      </Text>
      <Text style={{ marginBottom: 24, color: mutedForeground }}>
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

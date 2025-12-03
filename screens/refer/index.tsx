import { AuthorizationSection } from '@/screens/refer/components/authorization-section';
import { ChildInformationSection } from '@/screens/refer/components/child-information-section';
import { ReferralDetailsSection } from '@/screens/refer/components/referral-details-section';
import { SubmissionActions } from '@/screens/refer/components/submission-actions';
import { SubmissionSuccess } from '@/screens/refer/components/submission-success';
import { UpdateReferralForm } from '@/screens/refer/helpers';
import { ReferralFormData } from '@/types';
import { Gender, ReferralType } from '@/types/enum';
import { useRouter } from 'expo-router';
import React, { FC, useState } from 'react';
import { Alert, ScrollView, Text } from 'react-native';

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
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="mb-1 text-2xl font-bold text-success">Referral Form</Text>
      <Text className="mb-6 text-muted-foreground">Refer child to CMAM program (OTP/PHC)</Text>

      <ChildInformationSection formData={formData} onUpdate={updateForm} />

      <ReferralDetailsSection formData={formData} onUpdate={updateForm} />

      <AuthorizationSection formData={formData} onUpdate={updateForm} />

      <SubmissionActions onCancel={() => router.back()} onSubmit={handleSubmit} />
    </ScrollView>
  );
};
export default ReferralFormScreen;

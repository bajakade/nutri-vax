import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FACILITIES, REFERRAL_TYPE } from '@/constants/referral';
import { ReferralFormData } from '@/types';
import { Gender } from '@/types/enum';
import { useRouter } from 'expo-router';
import { CheckCircle, ChevronDown, Printer, Save, Share2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ReferralFormScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<ReferralFormData>({
    childName: '',
    immunizationNumber: '',
    age: '',
    sex: Gender.Male,
    muac: '',
    settlement: '',
    fromFacility: 'Afunori PHCC',
    toFacility: '',
    referralType: REFERRAL_TYPE.SAM,
    reason: '',
    signature: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [showToFacility, setShowToFacility] = useState(false);

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

  const updateForm = <K extends keyof ReferralFormData>(key: K, value: ReferralFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  if (submitted) {
    return (
      <ScrollView className="flex-1 px-4 pt-6 bg-background">
        <View className="max-w-2xl mx-auto">
          <View className="p-8 border bg-success/10 border-success/20 rounded-2xl">
            <View className="items-center">
              <View className="items-center justify-center w-20 h-20 mb-6 rounded-full bg-success">
                <CheckCircle size={40} color="white" />
              </View>
              <Text className="mb-2 text-2xl font-bold text-success">Referral Submitted</Text>
              <Text className="mb-8 text-center text-muted-foreground">
                Referral form has been generated successfully.
              </Text>

              <View className="flex-row flex-wrap justify-center gap-3">
                <Button variant="outline" className="border-success text-success rounded-2xl">
                  <Printer size={18} className="mr-2" />
                  Print PDF
                </Button>
                <Button variant="outline" className="border-success text-success rounded-2xl">
                  <Share2 size={18} className="mr-2" />
                  Share WhatsApp
                </Button>
                <Button
                  onPress={() => {
                    setSubmitted(false);
                    setFormData({
                      ...formData,
                      childName: '',
                      immunizationNumber: '',
                      age: '',
                      muac: '',
                      toFacility: '',
                      reason: '',
                      signature: '',
                    });
                  }}
                  className="bg-success"
                >
                  New Referral
                </Button>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 16 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="mb-1 text-2xl font-bold text-success">Referral Form</Text>
      <Text className="mb-8 text-muted-foreground">Refer child to CMAM program (OTP/PHC)</Text>

      {/* Child Information */}
      <View className="mb-6 overflow-hidden border bg-card border-border rounded-2xl">
        <View className="px-6 py-4 border-b bg-success/10 border-border">
          <Text className="text-lg font-semibold text-success">Child Information</Text>
        </View>

        <View className="p-6 space-y-5">
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="mb-2 text-sm font-medium text-foreground">Child Name *</Text>
              <Input
                placeholder="Enter child's name"
                value={formData.childName}
                onChangeText={(text: string) => updateForm('childName', text)}
              />
            </View>
          </View>
          <View className="flex-row gap-4 my-2">
            <View className="flex-1">
              <Text className="mb-2 text-sm font-medium text-foreground">
                Immunization Number *
              </Text>
              <Input
                placeholder="Enter immunization #"
                value={formData.immunizationNumber}
                onChangeText={(text: string) => updateForm('immunizationNumber', text)}
              />
            </View>
          </View>

          <View className="flex-row gap-4 my-2">
            <View className="flex-1">
              <Text className="mb-2 text-sm font-medium text-foreground">Age (months) *</Text>
              <Input
                keyboardType="numeric"
                placeholder="e.g. 18"
                value={formData.age}
                onChangeText={(text: string) => updateForm('age', text)}
              />
            </View>

            <View className="flex-1">
              <Text className="mb-2 text-sm font-medium text-foreground">Sex *</Text>
              <View className="flex-row gap-6 mt-3">
                {([Gender.Male, Gender.Female] as const).map((sex) => (
                  <TouchableOpacity
                    key={sex}
                    onPress={() => updateForm('sex', sex)}
                    className="flex-row items-center gap-3"
                  >
                    <View
                      className={`w-6 h-6 rounded-full border-2 ${
                        formData.sex === sex
                          ? 'border-success bg-success'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {formData.sex === sex && (
                        <View className="w-3 h-3 m-1 bg-white rounded-full" />
                      )}
                    </View>
                    <Text className="text-foreground">
                      {sex === Gender.Male ? 'Male' : 'Female'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View>
            <Text className="mb-2 text-sm font-medium text-foreground">MUAC (mm) *</Text>
            <Input
              keyboardType="numeric"
              placeholder="Enter MUAC measurement"
              value={formData.muac}
              onChangeText={(text: string) => updateForm('muac', text)}
            />
          </View>
        </View>
      </View>

      {/* Referral Details */}
      <View className="h-[600px] mb-6 overflow-hidden border bg-card border-border rounded-2xl">
        <View className="px-6 py-4 border-b bg-success/10 border-border">
          <Text className="text-lg font-semibold text-success">Referral Details</Text>
        </View>

        <View className="p-6 space-y-5">
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="mb-2 text-sm font-medium text-foreground">From Facility *</Text>
              <Input value={formData.fromFacility} editable={false} />
            </View>

            <View className="flex-1">
              <Text className="mb-2 text-sm font-medium text-foreground">To Facility *</Text>
              <TouchableOpacity
                onPress={() => setShowToFacility(true)}
                className="flex-row items-center justify-between px-4 py-3 border-2 border-border rounded-2xl bg-input-background"
              >
                <Text className={formData.toFacility ? 'text-foreground' : 'text-muted-foreground'}>
                  {FACILITIES.find((f) => f.value === formData.toFacility)?.label ||
                    'Select facility'}
                </Text>
                <ChevronDown size={20} color="#666" />
              </TouchableOpacity>

              {showToFacility && (
                <View className="absolute left-0 right-0 z-50 border shadow-2xl top-20 bg-card rounded-2xl border-border">
                  {FACILITIES.map((f) => (
                    <TouchableOpacity
                      key={f.value}
                      onPress={() => {
                        updateForm('toFacility', f.value);
                        setShowToFacility(false);
                      }}
                      className="px-5 py-4 border-2 border-border last:border-b-0"
                    >
                      <Text className="text-foreground">{f.label}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    onPress={() => setShowToFacility(false)}
                    className="px-5 py-4 bg-muted/50"
                  >
                    <Text className="font-medium text-center">Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <View>
            <Text className="my-3 text-sm font-medium text-foreground">Referral Type *</Text>
            <View className="grid grid-cols-2 gap-3">
              {[
                { value: REFERRAL_TYPE.SAM, label: 'SAM', desc: 'Severe Acute' },
                { value: REFERRAL_TYPE.MAM, label: 'MAM', desc: 'Moderate Acute' },
                { value: REFERRAL_TYPE.OTP, label: 'OTP', desc: 'Outpatient' },
                { value: REFERRAL_TYPE.SC, label: 'SC', desc: 'Stabilization' },
              ].map((type) => (
                <TouchableOpacity
                  key={type.value}
                  onPress={() => updateForm('referralType', type.value)}
                  className={`border rounded-2xl p-4 ${
                    formData.referralType === type.value
                      ? 'border-success bg-success/10'
                      : 'border-border'
                  }`}
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      className={`w-6 h-6 rounded-full border-2 ${
                        formData.referralType === type.value
                          ? 'border-success bg-success'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {formData.referralType === type.value && (
                        <View className="w-3 h-3 m-1 bg-white rounded-full" />
                      )}
                    </View>
                    <View>
                      <Text className="font-medium text-foreground">{type.label}</Text>
                      <Text className="text-xs text-muted-foreground">{type.desc}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View>
            <Text className="my-3 text-sm font-medium text-foreground">Reason for Referral *</Text>
            <Input
              multiline
              numberOfLines={4}
              placeholder="Describe the reason for referral..."
              value={formData.reason}
              onChangeText={(text: string) => updateForm('reason', text)}
              style={{
                paddingVertical: 12,
                minHeight: 96,
                borderRadius: 16,
              }}
            />
          </View>
        </View>
      </View>

      {/* Authorization */}
      <View className="mb-8 overflow-hidden border bg-card border-border rounded-2xl">
        <View className="px-6 py-4 border-b bg-success/10 border-border">
          <Text className="text-lg font-semibold text-success">Authorization</Text>
        </View>
        <View className="p-6">
          <Text className="mb-2 text-sm font-medium text-foreground">Digital Signature *</Text>
          <Input
            placeholder="Type your full name"
            value={formData.signature}
            onChangeText={(text: string) => updateForm('signature', text)}
          />
          <Text className="mt-2 text-xs text-muted-foreground">
            By typing your name, you authorize this referral
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View className="flex-row gap-4 pb-10">
        <Button variant="outline" onPress={() => router.back()} className="flex-1 rounded-2xl">
          Cancel
        </Button>
        <Button onPress={handleSubmit} className="flex-1 text-white bg-success rounded-2xl">
          <Save size={18} className="mr-2 text-white" color="white" />
          Generate Referral
        </Button>
      </View>
    </ScrollView>
  );
}

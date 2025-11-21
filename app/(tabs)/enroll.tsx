// app/(tabs)/enroll.tsx
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { FC, useState } from 'react';
import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  MAX_AGE_MONTHS,
  MIN_AGE_MONTHS,
  MIN_MUAC_MM,
} from '@/constants/assessment';
import { calculateAgeInMonths } from '@/helpers/age';
import { generateNutriVaxBarcode } from '@/helpers/barcode';
import { ChildData, Eligibility, Gender, YoN } from '@/types';
import { useRouter } from 'expo-router';


const EnrollChild: FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [childData, setChildData] = useState<ChildData>({
    name: '',
    sex: Gender.Male,
    dob: '',
    immunizationNumber: '',
    muac: '',
    oedema: YoN.No,
    zScore: YoN.Yes,
  });
  const [eligibility, setEligibility] = useState<Eligibility | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const checkEligibility = () => {
    const age = calculateAgeInMonths(childData.dob);
    const muac = parseInt(childData.muac) || 0;

    const isEligible =
      age >= MIN_AGE_MONTHS &&
      age <= MAX_AGE_MONTHS &&
      muac >= MIN_MUAC_MM &&
      childData.oedema === YoN.No &&
      childData.zScore === YoN.Yes;

    setEligibility(isEligible ? Eligibility.Eligible : Eligibility.Refer);
  };

  const handleNext = () => {
    if (step === 2) checkEligibility();
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleGenerateCard = () => {
    const barcode = generateNutriVaxBarcode();
    Alert.alert('Success', `NutriVax Barcode Generated: ${barcode}`);
    // TODO: Save to storage + navigate?
  };

  const YesNoButtonGroup = ({
    value,
    onChange,
  }: {
    value: YoN;
    onChange: (v: YoN) => void;
  }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
      {Object.values(YoN).map((v) => {
        const val = v as YoN;
        return (
          <TouchableOpacity
            key={String(val)}
            onPress={() => onChange(val)}
            style={{
              flex: 1,
              marginHorizontal: 4,
              paddingVertical: 14,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: value === val ? '#006600' : '#ccc',
              backgroundColor: value === val ? '#e8f5e9' : '#fff',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>
              {val === YoN.Yes ? 'Yes' : 'No'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <ParallaxScrollView>
      <View style={{ paddingHorizontal: 16, paddingTop: 24 }}>

        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#006600', marginBottom: 4 }}>
            Enroll Child
          </Text>
          <Text style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>
            Scan immunization card to register new beneficiary
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
          {[1, 2, 3].map((s) => (
            <View key={s} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: step >= s ? '#006600' : '#fff',
                  borderWidth: step >= s ? 0 : 2,
                  borderColor: '#ccc',
                  marginHorizontal: 4,
                }}>
                <Text style={{ color: step >= s ? '#fff' : '#ccc', fontWeight: '700' }}>
                  {s}
                </Text>
              </View>
              {s < 3 && (
                <View style={{ width: 24, height: 2, backgroundColor: step > s ? '#006600' : '#ccc' }} />
              )}
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 }}>
          {['Scan', 'Verify', 'Issue'].map((label, i) => (
            <Text
              key={label}
              style={{
                color: step === i + 1 ? '#006600' : '#666',
                fontWeight: step === i + 1 ? '700' : '400',
              }}>
              {label}
            </Text>
          ))}
        </View>

        {step === 1 && (
          <View style={{ marginBottom: 24 }}>
            {/* Child Name */}
            <Text style={{ marginBottom: 4 }}>Child Name *</Text>
            <TextInput
              value={childData.name}
              onChangeText={(text) => setChildData({ ...childData, name: text })}
              placeholder="Enter child's full name"
              style={{
                height: 48,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 12,
                paddingHorizontal: 12,
                marginBottom: 12,
              }}
            />

            {/* Sex */}
            <Text style={{ marginBottom: 4 }}>Sex *</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              {[Gender.Male, Gender.Female].map((sex) => (
                <TouchableOpacity
                  key={sex}
                  onPress={() => setChildData({ ...childData, sex })}
                  style={{
                    flex: 1,
                    marginHorizontal: 4,
                    paddingVertical: 12,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: childData.sex === sex ? '#006600' : '#ccc',
                    backgroundColor: childData.sex === sex ? '#e8f5e9' : '#fff',
                    alignItems: 'center',
                  }}>
                  <Text style={{ fontWeight: '600' }}>
                    {sex === Gender.Male ? 'Male' : 'Female'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Date of Birth */}
            <Text style={{ marginBottom: 4 }}>Date of Birth *</Text>
            <TextInput
              value={childData.dob}
              onChangeText={(text) => setChildData({ ...childData, dob: text })}
              placeholder="YYYY-MM-DD"
              style={{
                height: 48,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 12,
                paddingHorizontal: 12,
                marginBottom: 8,
              }}
            />
            {childData.dob ? (
              <Text style={{ marginBottom: 12, color: '#006600' }}>
                Age: {calculateAgeInMonths(childData.dob)} months
              </Text>
            ) : null}

            {/* Immunization Number */}
            <Text style={{ marginBottom: 4 }}>Immunization # *</Text>
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <TextInput
                value={childData.immunizationNumber}
                onChangeText={(text) => setChildData({ ...childData, immunizationNumber: text })}
                placeholder="Scan or enter number"
                style={{
                  flex: 1,
                  height: 48,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 12,
                  paddingHorizontal: 12,
                }}
              />
              <TouchableOpacity
                onPress={() => setShowScanner(true)}
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: '#e8f5e9',
                  marginLeft: 8,
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="barcode" size={20} color="#006600" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* === STEP 2: Assessment === */}
        {step === 2 && (
          <View
            style={{
              marginBottom: 24,
              padding: 16,
              backgroundColor: '#f9fff9',
              borderRadius: 16,
              elevation: 4,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 8,
            }}>
            {/* MUAC */}
            <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>MUAC (mm) *</Text>
            <TextInput
              value={childData.muac}
              onChangeText={(text) => setChildData({ ...childData, muac: text })}
              placeholder="Enter MUAC measurement"
              keyboardType="numeric"
              style={{
                height: 50,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 12,
                paddingHorizontal: 12,
                marginBottom: 16,
                fontSize: 16,
                backgroundColor: '#fff',
              }}
            />

            {/* Oedema */}
            <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>Oedema *</Text>
            <YesNoButtonGroup value={childData.oedema} onChange={(v) => setChildData({ ...childData, oedema: v })} />

            {/* Z-score */}
            <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>
              Z-score {'>'} -2 *
            </Text>
            <YesNoButtonGroup value={childData.zScore} onChange={(v) => setChildData({ ...childData, zScore: v })} />
          </View>
        )}

        {step === 3 && eligibility && (
          <View style={{ marginBottom: 24 }}>
            {eligibility === Eligibility.Eligible ? (
              <View style={{ backgroundColor: '#e8f5e9', padding: 16, borderRadius: 12, marginBottom: 16 }}>
                <Text style={{ fontWeight: '700', fontSize: 18, color: '#006600', marginBottom: 8 }}>
                  Child is Eligible!
                </Text>
                <Text>{childData.name} meets all criteria for SQ-LNS supplementation.</Text>
                <TouchableOpacity
                  onPress={handleGenerateCard}
                  style={{
                    marginTop: 16,
                    backgroundColor: '#006600',
                    paddingVertical: 12,
                    borderRadius: 12,
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>
                    Enrol & Generate NutriVax Barcode
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ backgroundColor: '#fff3cd', padding: 16, borderRadius: 12, marginBottom: 16 }}>
                <Text style={{ fontWeight: '700', fontSize: 18, color: '#856404', marginBottom: 8 }}>
                  Refer to CMAM
                </Text>
                <Text>{childData.name} does not meet SQ-LNS criteria.</Text>
                <TouchableOpacity
                  onPress={() => router.push('/(tabs)/refer')}
                  style={{
                    marginTop: 16,
                    backgroundColor: '#ffc107',
                    paddingVertical: 12,
                    borderRadius: 12,
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: '#856404', fontWeight: '700' }}>
                    Generate Referral Form
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          {step > 1 && (
            <TouchableOpacity
              onPress={handleBack}
              style={{
                flex: 1,
                marginRight: 8,
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: '#006600',
                paddingVertical: 12,
                borderRadius: 12,
                alignItems: 'center',
              }}>
              <Text style={{ color: '#006600', fontWeight: '700' }}>Back</Text>
            </TouchableOpacity>
          )}
          {step < 3 && (
            <TouchableOpacity
              onPress={handleNext}
              style={{
                flex: 1,
                marginLeft: step > 1 ? 8 : 0,
                backgroundColor: '#006600',
                paddingVertical: 12,
                borderRadius: 12,
                alignItems: 'center',
              }}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>Next</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Barcode Scanner Modal */}
        <Modal visible={showScanner} animationType="slide" onRequestClose={() => setShowScanner(false)}>
          <View style={{ flex: 1, backgroundColor: '#000' }}>
            {permission?.granted ? (
              <CameraView style={{ flex: 1 }} facing="back" />
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>Camera permission required</Text>
                <TouchableOpacity
                  onPress={() => requestPermission()}
                  style={{ marginTop: 20, padding: 12, backgroundColor: '#006600', borderRadius: 8 }}>
                  <Text style={{ color: '#fff' }}>Grant Permission</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Modal>
      </View>
    </ParallaxScrollView>
  );
};

export default EnrollChild;
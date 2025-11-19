import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CameraView, useCameraPermissions } from 'expo-camera';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import TopBarHeader from '@/components/tob-bar-header';

interface EnrollChildProps {
  onNavigate: (page: string) => void;
}

export default function EnrollChild({ onNavigate }: EnrollChildProps) {
  const [step, setStep] = useState(1);
  const [childData, setChildData] = useState({
    name: '',
    sex: 'M',
    dob: '',
    immunizationNumber: '',
    muac: '',
    oedema: 'N',
    zScore: 'Y',
    settlement: '',
  });
  const [eligibility, setEligibility] = useState<'eligible' | 'refer' | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [permission, requestPermission] = useCameraPermissions();

  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    return (
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      (today.getMonth() - birthDate.getMonth())
    );
  };

  const checkEligibility = () => {
    const age = calculateAge(childData.dob);
    const muac = parseInt(childData.muac);
    if (
      age >= 6 &&
      age <= 23 &&
      muac >= 115 &&
      childData.oedema === 'N' &&
      childData.zScore === 'Y'
    ) {
      setEligibility('eligible');
    } else {
      setEligibility('refer');
    }
  };

  const handleNext = () => {
    if (step === 2) checkEligibility();
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleGenerateCard = () => {
    const year = new Date().getFullYear();
    const randomId = Math.floor(100000 + Math.random() * 900000);
    const generatedBarcode = `NVX-${year}-${randomId}`;
    setBarcode(generatedBarcode);
    Alert.alert('Success', `NutriVax Barcode Generated: ${generatedBarcode}`);
  };

  return (
    <ParallaxScrollView
      stickyHeader={<TopBarHeader />}
      headerBackgroundColor={{ light: '#f9f9f9', dark: '#004d00' }}
    >
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16, paddingTop: 24 }}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
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
                }}
              >
                <Text style={{ color: step >= s ? '#fff' : '#ccc', fontWeight: '700' }}>{s}</Text>
              </View>
              {s < 3 && (
                <View
                  style={{
                    width: 24,
                    height: 2,
                    backgroundColor: step > s ? '#006600' : '#ccc',
                  }}
                />
              )}
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 }}>
          <Text
            style={{
              color: step === 1 ? '#006600' : '#666',
              fontWeight: step === 1 ? '700' : '400',
            }}
          >
            Scan
          </Text>
          <Text
            style={{
              color: step === 2 ? '#006600' : '#666',
              fontWeight: step === 2 ? '700' : '400',
            }}
          >
            Verify
          </Text>
          <Text
            style={{
              color: step === 3 ? '#006600' : '#666',
              fontWeight: step === 3 ? '700' : '400',
            }}
          >
            Issue
          </Text>
        </View>

        {/* Step Content */}
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
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}
            >
              {['M', 'F'].map((sex) => (
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
                  }}
                >
                  <Text style={{ fontWeight: '600' }}>{sex === 'M' ? 'Male' : 'Female'}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* DOB */}
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
                Age: {calculateAge(childData.dob)} months
              </Text>
            ) : null}

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
                }}
              >
                <Icon name="barcode" size={20} color="#006600" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <View
            style={{
              marginBottom: 24,
              padding: 16,
              backgroundColor: '#f9fff9',
              borderRadius: 16,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
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
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}
            >
              {['Y', 'N'].map((val) => (
                <TouchableOpacity
                  key={val}
                  onPress={() => setChildData({ ...childData, oedema: val })}
                  style={{
                    flex: 1,
                    marginHorizontal: 4,
                    paddingVertical: 14,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: childData.oedema === val ? '#006600' : '#ccc',
                    backgroundColor: childData.oedema === val ? '#e8f5e9' : '#fff',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>
                    {val === 'Y' ? 'Yes' : 'No'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Z-score */}
            <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>
              Z-score {'>'} -2 *
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {['Y', 'N'].map((val) => (
                <TouchableOpacity
                  key={val}
                  onPress={() => setChildData({ ...childData, zScore: val })}
                  style={{
                    flex: 1,
                    marginHorizontal: 4,
                    paddingVertical: 14,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: childData.zScore === val ? '#006600' : '#ccc',
                    backgroundColor: childData.zScore === val ? '#e8f5e9' : '#fff',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>
                    {val === 'Y' ? 'Yes' : 'No'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <View style={{ marginBottom: 24 }}>
            {eligibility === 'eligible' ? (
              <View
                style={{
                  backgroundColor: '#e8f5e9',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{ fontWeight: '700', fontSize: 18, color: '#006600', marginBottom: 8 }}
                >
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
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '700' }}>
                    Enrol & Generate NutriVax Barcode
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: '#fff3cd',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{ fontWeight: '700', fontSize: 18, color: '#856404', marginBottom: 8 }}
                >
                  Refer to CMAM
                </Text>
                <Text>{childData.name} does not meet SQ-LNS criteria.</Text>
                <TouchableOpacity
                  onPress={() => onNavigate('referral')}
                  style={{
                    marginTop: 16,
                    backgroundColor: '#ffc107',
                    paddingVertical: 12,
                    borderRadius: 12,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#856404', fontWeight: '700' }}>
                    Generate Referral Form
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Navigation Buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 }}>
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
              }}
            >
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
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>Next</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Barcode Scanner Modal */}
        <Modal
          visible={showScanner}
          animationType="slide"
          onRequestClose={() => setShowScanner(false)}
        >
          <View style={{ flex: 1, backgroundColor: '#000' }}>
            {permission?.granted ? (
              <CameraView style={{ flex: 1 }} facing="back" />
            ) : (
              <Text style={{ color: '#fff', textAlign: 'center', marginTop: 24 }}>
                Camera permission is required.
              </Text>
            )}
          </View>
        </Modal>
      </ScrollView>
    </ParallaxScrollView>
  );
}

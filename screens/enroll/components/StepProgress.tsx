import React from 'react';
import { Text, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type StepProgressProps = {
  currentStep: number;
};

const STEP_LABELS = ['Scan', 'Verify', 'Issue'];

export function StepProgress({ currentStep }: StepProgressProps) {
  const primary = useThemeColor({}, 'primary');
  const primaryForeground = useThemeColor({}, 'primaryForeground');
  const card = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const mutedForeground = useThemeColor({}, 'mutedForeground');

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
        {[1, 2, 3].map((step) => (
          <View key={step} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: currentStep >= step ? primary : card,
                borderWidth: currentStep >= step ? 0 : 2,
                borderColor,
                marginHorizontal: 4,
              }}
            >
              <Text
                style={{
                  color: currentStep >= step ? primaryForeground : mutedForeground,
                  fontWeight: '700',
                }}
              >
                {step}
              </Text>
            </View>
            {step < 3 && (
              <View
                style={{
                  width: 24,
                  height: 2,
                  backgroundColor: currentStep > step ? primary : borderColor,
                }}
              />
            )}
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 }}>
        {STEP_LABELS.map((label, index) => (
          <Text
            key={label}
            style={{
              color: currentStep === index + 1 ? primary : mutedForeground,
              fontWeight: currentStep === index + 1 ? '700' : '400',
            }}
          >
            {label}
          </Text>
        ))}
      </View>
    </>
  );
}

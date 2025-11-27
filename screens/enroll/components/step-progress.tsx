import React from 'react';
import { Text, View } from 'react-native';

import { useColor } from '@/hooks/use-color';

type StepProgressProps = {
  currentStep: number;
};

const STEP_LABELS = ['Scan', 'Verify', 'Issue'];

export function StepProgress({ currentStep }: StepProgressProps) {
  const primary = useColor('primary');
  const primaryForeground = useColor('primaryForeground');
  const card = useColor('card');
  const borderColor = useColor('border');
  const mutedForeground = useColor('mutedForeground');

  return (
    <>
      <View className="mb-4 flex-row justify-center">
        {[1, 2, 3].map((step) => (
          <View key={step} className="flex-row items-center">
            <View
              className="mx-1 h-9 w-9 items-center justify-center rounded-full"
              style={{
                backgroundColor: currentStep >= step ? primary : card,
                borderWidth: currentStep >= step ? 0 : 2,
                borderColor,
              }}
            >
              <Text
                className="font-bold"
                style={{ color: currentStep >= step ? primaryForeground : mutedForeground }}
              >
                {step}
              </Text>
            </View>
            {step < 3 && (
              <View
                className="h-0.5 w-6"
                style={{
                  backgroundColor: currentStep > step ? primary : borderColor,
                }}
              />
            )}
          </View>
        ))}
      </View>

      <View className="mb-6 flex-row justify-around">
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
